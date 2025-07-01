import React, { useEffect, useState } from 'react';

function TeacherSchedule({ teacher }) {
  const [students, setStudents] = useState([]);
  const [schedule, setSchedule] = useState({ student_id: '', appointment_time: '', purpose: '' });
  const [scheduleMsg, setScheduleMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/students/approved')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const handleSchedule = (e) => {
    e.preventDefault();
    setScheduleMsg('');
    fetch('http://localhost:5000/api/appointments/teacher-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teacher_id: teacher.id,
        student_id: schedule.student_id,
        appointment_time: schedule.appointment_time,
        purpose: schedule.purpose
      })
    })
      .then(res => res.json())
      .then(data => setScheduleMsg(data.message || data.error));
  };

  return (
    <div>
      <h3>Schedule Appointment (as Teacher)</h3>
      <form onSubmit={handleSchedule}>
        <select
          value={schedule.student_id}
          onChange={e => setSchedule({ ...schedule, student_id: e.target.value })}
          required
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={schedule.appointment_time}
          onChange={e => setSchedule({ ...schedule, appointment_time: e.target.value })}
          required
        />
        <input
          placeholder="Purpose"
          value={schedule.purpose}
          onChange={e => setSchedule({ ...schedule, purpose: e.target.value })}
          required
        />
        <button type="submit">Schedule</button>
      </form>
      {scheduleMsg && <p>{scheduleMsg}</p>}
    </div>
  );
}

export default TeacherSchedule;