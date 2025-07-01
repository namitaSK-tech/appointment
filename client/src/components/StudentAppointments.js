import React, { useEffect, useState } from 'react';

function StudentAppointments({ student }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointments/student/${student.id}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  }, [student.id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map(app => (
          <li key={app.id}>
            {app.appointment_time} - {app.purpose} - Status: {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentAppointments;