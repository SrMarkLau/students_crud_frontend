import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';

function StudentForm({ selectedStudent, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setEmail(selectedStudent.email);
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, email };
    if (selectedStudent) {
      StudentService.updateStudent(selectedStudent.id, student).then(() => onSave());
    } else {
      StudentService.createStudent(student).then(() => onSave());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">{selectedStudent ? 'Update' : 'Create'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default StudentForm;