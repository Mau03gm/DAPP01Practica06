import { createContext, useState, useEffect } from "react";
import {
  getAllemployeeDataFunction,
  createemployeeFunction,
  updateemployeeFunction,
  deleteemployeeFunction,
} from "./EmployeeData.js";


export const GetTheAppContext = createContext();

export const AppContext = (props) => {

  const [getDataFromTable, setGetDataFromTable] = useState({});
  const [actionButtonModal, setActionButtonModal] = useState("Agregar");
  const [textAlert, setTextAlert] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [dataGetAllemployee, setDataAllemployee] = useState([]);
  const [dataUseremployee, setDataUseremployee] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("");


  useEffect(() => {
    getAllemployeeDataFunction(setDataAllemployee, token);

  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showFloatingAlert, setShowFloatingAlert] = useState(false);

  const handleShowFloatAlter = () => {
    setShowFloatingAlert(true);
  };

  const handleCloseFloatAlert = () => {
    setShowFloatingAlert(false);
  };

  return (
    <GetTheAppContext.Provider
      value={{
        handleCloseModal,
        handleShowModal,
        showModal,
        getDataFromTable,
        setGetDataFromTable,
        actionButtonModal,
        setActionButtonModal,
        handleShowFloatAlter,
        handleCloseFloatAlert,
        showFloatingAlert,
        textAlert,
        setTextAlert,
        employeeId,
        setemployeeId,
        dataGetAllemployee, 
        setDataAllemployee,
        dataUseremployee, 
        setDataUseremployee,
        createemployeeFunction,
        updateemployeeFunction,
        deleteemployeeFunction,
        getAllemployeeDataFunction,
        token,
        setToken
      }}
    >
      {props.children}
    </GetTheAppContext.Provider>
  );
};
