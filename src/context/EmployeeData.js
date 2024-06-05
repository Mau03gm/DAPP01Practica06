import axios from "axios";

const employeeURL = "http://localhost:8080/crud/empleados/";

export const getAllemployeeDataFunction = async (setGetAllemployee) => {
  try {
    const response = await axios.get(employeeURL);
    setGetAllemployee(response.data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createemployeeFunction = async (arrayData) => {
  try {
    const response = await axios.post(employeeURL, arrayData);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateemployeeFunction = async (arrayData, idemployee) => {
  console.log(idemployee);
  console.log(arrayData);
  const urlUpdate = `${employeeURL}${idemployee}`;
  try {
    const response = await axios.patch(urlUpdate, arrayData);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteemployeeFunction = async (idemployee) => {
  try {
    const urlDelete = `${employeeURL}${idemployee}`;
    const response = await axios.delete(urlDelete);
    return response;
  } catch (error) {
    return error;
  }
};
