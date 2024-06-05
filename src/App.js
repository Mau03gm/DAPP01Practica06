import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import Login from "./components/login";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        
        <Route path="/empleados" element={<EmployeeList/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
