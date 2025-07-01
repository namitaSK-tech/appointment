import React, { useState } from 'react';

function TeacherRegister({ onBack }) {
  const [form, setForm] = useState({ name: '', department: '', subject: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => setMessage(data.message || data.error))
      .catch(() => setMessage('Error registering teacher.'));
  };

  return (
    <div>
      <h3>Teacher Registration</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <button type="button" onClick={onBack} style={{ marginTop: '10px' }}>
        Back to Login
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TeacherRegister;