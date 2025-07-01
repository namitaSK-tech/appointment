import React, { useEffect, useState } from 'react';

function StudentMessages({ student }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [sendMsgStatus, setSendMsgStatus] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch all appointments for this student
    fetch(`http://localhost:5000/api/appointments/student/${student.id}`)
      .then(res => res.json())
      .then(data => setAppointments(data));

    // Fetch all messages for this student
    fetch(`http://localhost:5000/api/students/all-messages/${student.id}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });
  }, [student.id]);

  const handleSendMessage = async () => {
    setSendMsgStatus('');
    const res = await fetch('http://localhost:5000/api/students/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appointment_id: selectedAppointment,
        student_id: student.id,
        content: newMessage
      })
    });
    const data = await res.json();
    setSendMsgStatus(data.message || data.error);
    setNewMessage('');
    // Refresh messages after sending
    fetch(`http://localhost:5000/api/students/all-messages/${student.id}`)
      .then(res => res.json())
      .then(msgs => setMessages(msgs));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Your Messages</h3>
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
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            <strong>
              {msg.sender_role === 'student'
                ? `You (Student ID: ${msg.sender_id})`
                : `Teacher (ID: ${msg.sender_id})`}
              :
            </strong>{' '}
            {msg.content} <small>({msg.sent_at})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentMessages;