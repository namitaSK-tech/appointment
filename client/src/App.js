import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import TeacherList from './components/TeacherList';
import AdminApproveStudents from './components/AdminApproveStudents';
import StudentRegister from './components/StudentRegister';
import TeacherRegister from './components/TeacherRegister';
import AdminRegister from './components/AdminRegister';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [showRegister, setShowRegister] = useState(null); // null, 'student', 'teacher', 'admin'

  const handleLogin = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
  };

   const handleLogout = () => {
    setUser(null);
    setRole('');
    setShowRegister(null);
  };

  if (!user) {
    if (showRegister === 'student') {
      return <StudentRegister onBack={() => setShowRegister(null)} />;
    }
    if (showRegister === 'teacher') {
      return <TeacherRegister onBack={() => setShowRegister(null)} />;
      
    }
    if (showRegister === 'admin') {
      return <AdminRegister onBack={() => setShowRegister(null)} />;
    }
    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={setShowRegister}
      />
    );
  }

  if (role === 'student') {
  return <StudentDashboard student={user} onLogout={handleLogout} />;
  }

  if (role === 'admin') {
    return (
      <div>
        <h2>Admin Dashboard</h2>
         <button onClick={handleLogout} style={{ float: 'right', marginBottom: '10px' }}>
          Logout
        </button>
        <TeacherList />
        <AdminApproveStudents />
      </div>
    );
  }

  if (role === 'teacher') {
  return (
    <TeacherDashboard teacher={user} onLogout={handleLogout} />
  );
}

  // Add teacher/student dashboards as needed
  return <div>Welcome, {user.name || user.username}!</div>;
}

export default App;