import React, { useEffect, useState } from 'react';

function TeacherAppointments({ teacher }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointments/teacher/${teacher.id}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  }, [teacher.id]);

  const handleStatus = (id, status) => {
    fetch(`http://localhost:5000/api/appointments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(() => {
        setAppointments(apps => apps.map(app =>
          app.id === id ? { ...app, status } : app
        ));
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>All Appointments</h3>
      <ul>
        {appointments.map(app => (
          <li key={app.id}>
            {app.appointment_time} - {app.purpose} - Status: {app.status}
            {app.status === 'pending' && (
              <>
                <button onClick={() => handleStatus(app.id, 'approved')} style={{ marginLeft: 8 }}>Approve</button>
                <button onClick={() => handleStatus(app.id, 'cancelled')} style={{ marginLeft: 8 }}>Cancel</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherAppointments;