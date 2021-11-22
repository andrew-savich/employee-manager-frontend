import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees/";

class EmployeeService {

    getEmployeeList() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASE_URL, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + employeeId);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + employeeId);
    }

    getEmployeeGenders(){
        return axios.get(EMPLOYEE_API_BASE_URL + 'genders');
    }

    getEmployeeDepartments(){
        return axios.get(EMPLOYEE_API_BASE_URL + 'departments');
    }

}

export default new EmployeeService();