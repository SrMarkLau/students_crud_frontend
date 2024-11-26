import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import StudentService from '../../services/StudentService';

const mock = new MockAdapter(axios);
const STUDENT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/students';

describe('StudentService Tests', () => {
  afterEach(() => {
    mock.reset(); // Limpa os mocks após cada teste
  });

  test('should fetch all students', async () => {
    const students = [
      { id: 1000, name: 'John Doe', email: 'johndoe@example.com' },
      { id: 1001, name: 'Jane Doe', email: 'janedoe@example.com' },
    ];

    mock.onGet(STUDENT_API_BASE_URL).reply(200, students);

    const response = await StudentService.getStudents();
    expect(response.data).toEqual(students);
  });

  test('should fetch a student by ID', async () => {
    const student = { id: 1000, name: 'John Doe', email: 'johndoe@example.com' };

    mock.onGet(`${STUDENT_API_BASE_URL}/1000`).reply(200, student);

    const response = await StudentService.getStudentById(1000);
    expect(response.data).toEqual(student);
  });

  test('should create a new student', async () => {
    const newStudent = { name: 'John Doe', email: 'johndoe@example.com' };
    const createdStudent = { id: 1000, ...newStudent };

    mock.onPost(STUDENT_API_BASE_URL, newStudent).reply(201, createdStudent);

    const response = await StudentService.createStudent(newStudent);
    expect(response.data).toEqual(createdStudent);
  });

  test('should update an existing student', async () => {
    const updatedStudent = { name: 'John Doe Updated', email: 'johnupdated@example.com' };

    mock.onPut(`${STUDENT_API_BASE_URL}/1000`, updatedStudent).reply(200, updatedStudent);

    const response = await StudentService.updateStudent(1000, updatedStudent);
    expect(response.data).toEqual(updatedStudent);
  });

  test('should delete a student by ID', async () => {
    mock.onDelete(`${STUDENT_API_BASE_URL}/1000`).reply(204);

    const response = await StudentService.deleteStudent(1000);
    expect(response.status).toBe(204);
  });
});