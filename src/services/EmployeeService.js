import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee-manager/api/employee";

class EmployeeService {

    getEmployeeList() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + '/create', employee);
    }

    updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASE_URL + '/update', employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/delete/' + employeeId);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/get/' + employeeId);
    }

    getEmployeeGenders(){
        return axios.get(EMPLOYEE_API_BASE_URL + '/genders');
    }

    getEmployeeDepartments(){
        return axios.get(EMPLOYEE_API_BASE_URL + '/departments');
    }

}

export default new EmployeeService();