import StudentService from '../../services/StudentService';

describe('StudentService Tests (Mocked)', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks após cada teste
  });

  test('should fetch all students', async () => {
    const students = [
      { id: 1000, name: 'John Doe', email: 'johndoe@example.com' },
      { id: 1001, name: 'Jane Doe', email: 'janedoe@example.com' },
    ];

    jest.spyOn(StudentService, 'getStudents').mockResolvedValue({ data: students });

    const response = await StudentService.getStudents();
    expect(response.data).toEqual(students);
    expect(StudentService.getStudents).toHaveBeenCalledTimes(1);
  });

  test('should fetch a student by ID', async () => {
    const student = { id: 1000, name: 'John Doe', email: 'johndoe@example.com' };

    jest.spyOn(StudentService, 'getStudentById').mockResolvedValue({ data: student });

    const response = await StudentService.getStudentById(1000);
    expect(response.data).toEqual(student);
    expect(StudentService.getStudentById).toHaveBeenCalledWith(1000);
    expect(StudentService.getStudentById).toHaveBeenCalledTimes(1);
  });

  test('should create a new student', async () => {
    const newStudent = { name: 'John Doe', email: 'johndoe@example.com' };
    const createdStudent = { id: 1000, ...newStudent };

    jest.spyOn(StudentService, 'createStudent').mockResolvedValue({ data: createdStudent });

    const response = await StudentService.createStudent(newStudent);
    expect(response.data).toEqual(createdStudent);
    expect(StudentService.createStudent).toHaveBeenCalledWith(newStudent);
    expect(StudentService.createStudent).toHaveBeenCalledTimes(1);
  });

  test('should update an existing student', async () => {
    const updatedStudent = { name: 'John Doe Updated', email: 'johnupdated@example.com' };

    jest.spyOn(StudentService, 'updateStudent').mockResolvedValue({ data: updatedStudent });

    const response = await StudentService.updateStudent(1000, updatedStudent);
    expect(response.data).toEqual(updatedStudent);
    expect(StudentService.updateStudent).toHaveBeenCalledWith(1000, updatedStudent);
    expect(StudentService.updateStudent).toHaveBeenCalledTimes(1);
  });

  test('should delete a student by ID', async () => {
    jest.spyOn(StudentService, 'deleteStudent').mockResolvedValue({ status: 204 });

    const response = await StudentService.deleteStudent(1000);
    expect(response.status).toBe(204);
    expect(StudentService.deleteStudent).toHaveBeenCalledWith(1000);
    expect(StudentService.deleteStudent).toHaveBeenCalledTimes(1);
  });
});