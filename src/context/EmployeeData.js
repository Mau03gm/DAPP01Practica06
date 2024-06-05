import axios from "axios";

const employeeURL = "http://localhost:8081/api/v1/empleado";

export const getAllemployeeDataFunction = async (setGetAllemployee, token) => {
  try {
    const response = await axios.get(employeeURL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setGetAllemployee(response.data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createemployeeFunction = async (arrayData, token) => {
  try {
    const response = await axios.post(employeeURL, arrayData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateemployeeFunction = async (arrayData, idemployee, token) => {
  const urlUpdate = `${employeeURL}/${idemployee}`;
  try {
    const response = await axios.patch(urlUpdate, arrayData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteemployeeFunction = async (idemployee, token) => {
  try {
    const urlDelete = `${employeeURL}/${idemployee}`;
    const response = await axios.delete(urlDelete, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};
