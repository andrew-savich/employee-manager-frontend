import './App.css';
import { Route, Routes } from 'react-router';
import EmployeeList from './containers/EmployeeList/EmployeeList';
import EmployeeForm from './containers/EmployeeForm/EmployeeForm';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/employees" exact element={<EmployeeList />} ></Route>
        <Route path="/employees/add" element={<EmployeeForm />} ></Route>
        <Route path="/employees/edit/:id" element={<EmployeeForm />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
