import React, { useState } from 'react';
import { useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { checkInput } from '../../validation/Validation';
import { Button } from '../../components/Button/Button';
import { useNavigate, useParams }from 'react-router-dom';

const EmployeeForm = props => {
    const { id } = useParams();
    const [genders, setGenders] = useState([]);
    const [currentGender, setCurrentGender] = useState();
    const [departments, setDepartments] = useState([]);
    const [currentDepartment, setCurrentDepartment] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputFields, setInputFields] = useState({
        firstName: {
            value: '',
            type: 'text',
            label: 'First Name',
            errorMessage: 'Min 2 and max 30 characters, and should be to include Rus and Eng letters',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30,
                pattern: /^[а-яА-Яa-zA-Z]*$/
            }
        },
        lastName: {
            value: '',
            type: 'text',
            label: 'Last Name',
            errorMessage: 'Min 2 and max 30 characters, and should be to include Rus and Eng letters',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30,
                pattern: /^[а-яА-Яa-zA-Z]*$/
            }
        },
        jobTitle: {
            value: '',
            type: 'text',
            label: 'Job Title',
            errorMessage: 'Type the correct job title',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30,
            }
        },
        dateOfBirth: {
            value: '',
            type: 'date',
            label: 'Date of Birth',
            errorMessage: 'Type the correct date',
            valid: true
        }

    });

    const naviget = useNavigate();

    useEffect(() => {
        const init = async () => {
            const gendersResponse = (await EmployeeService.getEmployeeGenders()).data;
            const departmentsResponse = (await EmployeeService.getEmployeeDepartments()).data;

            setGenders(gendersResponse);
            setDepartments(departmentsResponse);

            if(id){
                const employeeResponse = (await EmployeeService.getEmployeeById(id)).data;

                const inputs = { ...inputFields };

                Array.from(Object.keys(employeeResponse)).forEach((field) => {

                    if (inputs[field]) {
                        inputs[field].value = employeeResponse[field];
                        inputs[field].valid = true;
                    }
                
                });

                setCurrentGender(employeeResponse.gender);
                setCurrentDepartment(employeeResponse.department);
                setInputFields(inputs);

            } else {
                setCurrentGender(gendersResponse[0]);
                setCurrentDepartment(departmentsResponse[0]);
            }
            
            setIsFormValid(true);
        }

        init();
    }, []);

    const changeInputHandler = (event, name) => {
        const inputs = {...inputFields};
        const input = { ...inputs[name] };

        input.value = event.target.value;
        input.touched = true;
        input.valid = checkInput(input.validation, input.value);

        inputs[name] = input;

        let isFormValid = true;

        Object.keys(inputs).forEach(itemName => {
            isFormValid = inputs[itemName].valid && isFormValid;
        });

        setInputFields(inputs);
        setIsFormValid (isFormValid);
    
    };

    const changeGenderHandler = event => {
        setCurrentGender(event.target.value);
    };

    const changeDepartmentHandler = event => {
        setCurrentDepartment(event.target.value);
    };

    const renderFormElements = () => {
        return Object.keys(inputFields).map((inputName, index) => {
            const input = inputFields[inputName];
            
            return (
                <Input 
                    key={inputName + index}
                    type={input.type}
                    value={input.value}
                    valid={input.valid}
                    touched={input.touched}
                    label={input.label}
                    shouldValidate={!!input.validation}
                    errorMessage={input.errorMessage}
                    onChange={(e) => changeInputHandler(e, inputName)}
                />
            )

        });
    };

    const cancel = () => {
        naviget('/employees');
    };

    const deleteEmployee = employeeId => {
        EmployeeService.deleteEmployee(employeeId).then(() => {
            naviget('/employees');
        });
    }

    const saveEmployee = async event => {
        event.preventDefault();

        const employee = {
            id: id,
            firstName: inputFields.firstName.value,
            lastName: inputFields.lastName.value,
            jobTitle: inputFields.jobTitle.value,
            dateOfBirth: inputFields.dateOfBirth.value,
            gender: currentGender,
            department: currentDepartment
        }

        if (id) {
            try {
                await EmployeeService.updateEmployee(employee);
                naviget('/employees');
            } catch (error){
                alert(error.response.data);
            }

        } else {
            try {
                await EmployeeService.createEmployee(employee);
                naviget('/employees');
            } catch(error) {
                alert(error.response.data);
            }
        }
        
    };

    return(

        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">{ id ? "Edit employee" : "Add employee" }</h3>
                    <form>
                        { renderFormElements() }
                        
                        <Select
                            label="Gender"
                            defaultValue={currentGender}
                            onChange={(e) => changeGenderHandler(e)}
                            items={genders}
                        />

                        <Select
                            label="Department"
                            defaultValue={currentDepartment}
                            onChange={(e) => changeDepartmentHandler(e)}
                            items={departments}
                        />

                        <Button className="btn btn-success me-2" onClick={saveEmployee} title="Save" disabled={!isFormValid}/>
                        <Button className="btn btn-secondary" onClick={cancel} title="Cancel" />

                    </form>

                    { id ? <Button className="btn btn-danger w-100 mt-2" onClick={() => deleteEmployee(id)} title="Delete" />: null }

                </div>
            </div>
        </div>
    )
        

}

export default EmployeeForm;