import React, { useState } from 'react';

function Login({ onLogin, onShowRegister }) {
  const [role, setRole] = useState('admin');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setForm({ username: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    let url = '';
    let body = {};
    if (role === 'admin') {
      url = 'http://localhost:5000/api/login/admin';
      body = { username: form.username, password: form.password };
    } else {
      url = `http://localhost:5000/api/login/${role}`;
      body = { email: form.email, password: form.password };
    }
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setMessage(data.error);
        else {
          setMessage(data.message);
          if (onLogin) onLogin(data.user, data.role);
        }
      })
      .catch(() => setMessage('Login failed.'));
  };

  return (
    <div>
      <h3>Login</h3>
      <div style={{ marginBottom: '10px' }}>
        <button type="button" onClick={() => onShowRegister('student')} style={{ marginRight: '5px' }}>
          Register as Student
        </button>
        <button type="button" onClick={() => onShowRegister('teacher')} style={{ marginRight: '5px' }}>
          Register as Teacher
        </button>
        <button type="button" onClick={() => onShowRegister('admin')}>
          Register as Admin
        </button>
      </div>
      <select value={role} onChange={handleRoleChange}>
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      <form onSubmit={handleSubmit}>
        {role === 'admin' ? (
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        ) : (
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        )}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;