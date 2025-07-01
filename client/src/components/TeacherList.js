import React, { useEffect, useState } from 'react';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    department: '',
    subject: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (editId) {
      // Update teacher
      fetch(`http://localhost:5000/api/teachers/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage('Teacher updated successfully!');
            setForm({ name: '', department: '', subject: '', email: '', password: '' });
            setEditId(null);
            fetchTeachers();
          }
        })
        .catch(() => setMessage('Error updating teacher.'));
    } else {
      // Add teacher
      fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage('Teacher added successfully!');
            setForm({ name: '', department: '', subject: '', email: '', password: '' });
            fetchTeachers();
          }
        })
        .catch(() => setMessage('Error adding teacher.'));
    }
  };

  const handleEdit = (teacher) => {
    setEditId(teacher.id);
    setForm({
      name: teacher.name,
      department: teacher.department,
      subject: teacher.subject,
      email: teacher.email,
      password: teacher.password
    });
    setMessage('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage('Teacher deleted successfully!');
            fetchTeachers();
          }
        })
        .catch(() => setMessage('Error deleting teacher.'));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            <strong>{teacher.name}</strong> — {teacher.department} — {teacher.subject}
            <button onClick={() => handleEdit(teacher)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(teacher.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editId ? 'Edit Teacher' : 'Add Teacher'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update Teacher' : 'Add Teacher'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: '', department: '', subject: '', email: '', password: '' }); }}>Cancel</button>}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TeacherList;