import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import StudentAppointments from './StudentAppointments';
import StudentMessages from './StudentMessages';
import SearchTeachers from './SearchTeachers';

function StudentDashboard({ student, onLogout }) {
  return (
    <Router>
      <div>
        <h2>Student Dashboard</h2>
        <button onClick={onLogout} style={{ float: 'right', marginBottom: '10px' }}>
          Logout
        </button>
        <nav>
          <Link to="/profile">Profile</Link> |{' '}
          <Link to="/appointments">Appointments</Link> |{' '}
          <Link to="/messages">Messages</Link> |{' '}
          <Link to="/search">Search Teachers</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/profile" element={<StudentProfile student={student} />} />
          <Route path="/appointments" element={<StudentAppointments student={student} />} />
          <Route path="/messages" element={<StudentMessages student={student} />} />
       
          <Route path="/search" element={<SearchTeachers student={student} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default StudentDashboard;