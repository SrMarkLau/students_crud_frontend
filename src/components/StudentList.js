import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';

function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    StudentService.getStudents().then((res) => {
      setStudents(res.data);
    });
  };

  const deleteStudent = (id) => {
    StudentService.deleteStudent(id).then(() => fetchStudents());
  };

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => onEdit(student)}>Edit</button>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;