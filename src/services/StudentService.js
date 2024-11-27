import axios from 'axios';

const STUDENT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class StudentService {
  getStudents() {
    return axios.get(STUDENT_API_BASE_URL);
  }

  getStudentById(id) {
    return axios.get(`${STUDENT_API_BASE_URL}/${id}`);
  }

  createStudent(student) {
    return axios.post(STUDENT_API_BASE_URL, student);
  }

  updateStudent(id, student) {
    return axios.put(`${STUDENT_API_BASE_URL}/${id}`, student);
  }

  deleteStudent(id) {
    return axios.delete(`${STUDENT_API_BASE_URL}/${id}`);
  }
}

// Assign the instance of the class to a variable
const studentServiceInstance = new StudentService();

// Export the instance as the default export
export default studentServiceInstance;