import React from 'react';

function TeacherProfile({ teacher }) {
  return (
    <div>
      <h3>Profile</h3>
      <p>Name: {teacher.name}</p>
      <p>Email: {teacher.email}</p>
      <p>Department: {teacher.department}</p>
      <p>Subject: {teacher.subject}</p>
    </div>
  );
}

export default TeacherProfile;