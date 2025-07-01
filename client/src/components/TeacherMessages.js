import React, { useEffect, useState } from 'react';

function TeacherMessages({ teacher }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [sendMsgStatus, setSendMsgStatus] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointments/teacher/${teacher.id}`)
      .then(res => res.json())
      .then(data => setAppointments(data));

    fetch(`http://localhost:5000/api/teachers/all-messages/${teacher.id}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });
  }, [teacher.id]);

  const handleSendMessage = async () => {
    setSendMsgStatus('');
    const res = await fetch('http://localhost:5000/api/teachers/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appointment_id: selectedAppointment,
        teacher_id: teacher.id,
        content: newMessage
      })
    });
    const data = await res.json();
    setSendMsgStatus(data.message || data.error);
    setNewMessage('');
    fetch(`http://localhost:5000/api/teachers/all-messages/${teacher.id}`)
      .then(res => res.json())
      .then(msgs => setMessages(msgs));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Send Message</h3>
      <select
        value={selectedAppointment}
        onChange={e => setSelectedAppointment(e.target.value)}
        required
      >
        <option value="">Select Appointment</option>
        {appointments.map(app => (
          <option key={app.id} value={app.id}>
            {app.appointment_time} - {app.purpose}
          </option>
        ))}
      </select>
      <input
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Type your message"
        required
      />
      <button
        onClick={handleSendMessage}
        disabled={!selectedAppointment || !newMessage}
      >
        Send
      </button>
      {sendMsgStatus && <p>{sendMsgStatus}</p>}
      <h3>Messages</h3>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            <strong>
              {msg.sender_role === 'teacher'
                ? `You (Teacher ID: ${msg.sender_id})`
                : `Student (ID: ${msg.sender_id})`}
              :
            </strong>{' '}
            {msg.content} <small>({msg.sent_at})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherMessages;