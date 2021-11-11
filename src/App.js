import './App.css';
import { Route, Routes } from 'react-router';
import EmployeeList from './containers/EmployeeList/EmployeeList';


function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" exact element={<EmployeeList/>} ></Route> */}
        <Route path="/employees" exact element={<EmployeeList />} ></Route>
       
      </Routes>
    </div>
  );
}

export default App;
