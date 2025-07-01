import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeacherProfile from './TeacherProfile';
import TeacherAppointments from './TeacherAppointments';
import TeacherMessages from './TeacherMessages';
import TeacherSchedule from './TeacherSchedule';

function TeacherDashboard({ teacher, onLogout }) {
  return (
    <Router>
      <div>
        <h2>Teacher Dashboard</h2>
        <button onClick={onLogout} style={{ float: 'right', marginBottom: '10px' }}>
          Logout
        </button>
        <nav>
          <Link to="/profile">Profile</Link> |{' '}
          <Link to="/appointments">Appointments</Link> |{' '}
          <Link to="/messages">Messages</Link> |{' '}
          <Link to="/schedule">Schedule Appointment</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/profile" element={<TeacherProfile teacher={teacher} />} />
          <Route path="/appointments" element={<TeacherAppointments teacher={teacher} />} />
          <Route path="/messages" element={<TeacherMessages teacher={teacher} />} />
          <Route path="/schedule" element={<TeacherSchedule teacher={teacher} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default TeacherDashboard;