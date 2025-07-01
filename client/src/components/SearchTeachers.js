import React, { useState } from 'react';

function SearchTeachers({ student }) {
  const [query, setQuery] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingTeacherId, setBookingTeacherId] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [bookMsg, setBookMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBookMsg('');
    const res = await fetch(`http://localhost:5000/api/students/search-teachers?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setTeachers(data);
    setLoading(false);
  };

  const handleBook = async (teacherId) => {
    setBookMsg('');
    const studentId = student?.id; // Use prop instead of localStorage
    if (!studentId) {
      setBookMsg('Student not logged in');
      return;
    }
    const res = await fetch('http://localhost:5000/api/appointments/book-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teacher_id: teacherId,
        student_id: studentId,
        appointment_time: appointmentTime,
        purpose
      })
    });
    const data = await res.json();
    setBookMsg(data.message || data.error);
    setBookingTeacherId(null);
    setAppointmentTime('');
    setPurpose('');
  };

  return (
    <div>
      <h3>Search Teachers</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, department, or subject"
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {bookMsg && <p>{bookMsg}</p>}
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            {teacher.name} - {teacher.department} - {teacher.subject} ({teacher.email})
            <button style={{ marginLeft: 8 }} onClick={() => setBookingTeacherId(teacher.id)}>
              Book Appointment
            </button>
            {bookingTeacherId === teacher.id && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleBook(teacher.id);
                }}
                style={{ marginTop: 8 }}
              >
                <input
                  type="datetime-local"
                  value={appointmentTime}
                  onChange={e => setAppointmentTime(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  placeholder="Purpose"
                  required
                />
                <button type="submit">Confirm</button>
                <button type="button" onClick={() => setBookingTeacherId(null)} style={{ marginLeft: 4 }}>
                  Cancel
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTeachers;