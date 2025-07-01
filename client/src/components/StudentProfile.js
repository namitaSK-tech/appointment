import React from 'react';

function StudentProfile({ student }) {
  return (
    <div>
      <h3>Profile</h3>
      <p>Name: {student.name}</p>
      <p>Email: {student.email}</p>
      {/* Add more profile info as needed */}
    </div>
  );
}

export default StudentProfile;