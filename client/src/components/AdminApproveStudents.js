import React, { useEffect, useState } from 'react';

function AdminApproveStudents() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = () => {
    fetch('http://localhost:5000/api/students/pending')
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  const approveStudent = (id) => {
    fetch(`http://localhost:5000/api/students/approve/${id}`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || data.error);
        fetchPending();
      });
  };
  
  return (
    <div>
      <h3>Pending Student Approvals</h3>
      {students.length === 0 && <p>No pending students.</p>}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.email})
            <button onClick={() => approveStudent(student.id)} style={{ marginLeft: '10px' }}>Approve</button>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminApproveStudents;