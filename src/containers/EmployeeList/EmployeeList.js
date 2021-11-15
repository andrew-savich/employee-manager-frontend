import React, {useState, useEffect} from 'react';
import { Button } from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import EmployeeService from '../../services/EmployeeService';
import {useNavigate, useLocation} from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const currentPath = useLocation().pathname;

    useEffect(() => {
        const init = async () => {
            const employeesResponse = (await EmployeeService.getEmployeeList()).data;

            if (employeesResponse != null) {
                setEmployees(employeesResponse);
            }
        };

        init();

    }, []);

    const addEmployeeHandler = () => {
        navigate(currentPath + "/add");
    };

    const editEmployeeHandler = id => {
        navigate(currentPath + "/edit/" + id);
    };

    return (
        <div className="container">
            <h2 className="text-center">Employee List</h2>
            <Button className="btn btn-primary" onClick={addEmployeeHandler} title="Add employee" />

            <Table
                entities={employees}
                action={ {
                    title: "Edit",
                    handler: editEmployeeHandler
                }}
            />
            
        </div>
    )

}

export default EmployeeList;