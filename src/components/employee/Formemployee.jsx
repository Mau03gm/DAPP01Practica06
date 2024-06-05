import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { GetTheAppContext } from "../../context/AppContext";
import { statusCreated, statusOk } from "../HttpStatus/HTTPStatusCode";

export const Formemployee = ({ isGetData = {} }) => {
  const {
    handleShowFloatAlter,
    handleCloseModal,
    actionButtonModal,
    setTextAlert,
    setGetDataFromTable,
    createemployeeFunction,
    getAllemployeeDataFunction,
    setDataAllemployee,
    updateemployeeFunction,
    employeeId,
  } = useContext(GetTheAppContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const getMessageForAlert = (data) => {
    if (actionButtonModal === "Agregar") {
      return setTextAlert("Médico agregado exitosamente");
    } else if (actionButtonModal === "Editar") {
      return setTextAlert(`Médico ${data.name} actualizado exitosamente`);
    }
    return "";
  };

  const onSubmitClick = async (data) => {
    if (actionButtonModal === "Agregar") {
      handleCloseModal();
      const response = await createemployeeFunction(data);

      if (response.status === statusCreated) {
        await getAllemployeeDataFunction(setDataAllemployee);
        getMessageForAlert();
        handleShowFloatAlter();
      } else {
        setTextAlert("Error al agregar la prescripción médica");
        handleShowFloatAlter();
      }
    } else if (actionButtonModal === "Editar") {
      console.log(data);
      handleCloseModal();
      const response = await updateemployeeFunction(data, employeeId);
      if (response.status === statusOk ) {
        getMessageForAlert(data);
        await getAllemployeeDataFunction(setDataAllemployee);
        handleShowFloatAlter();
      } else {
        setTextAlert("Error al agregar el médico");
        handleShowFloatAlter();
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitClick)}>
      <div className="form-group mb-3">
          <label>
            Nombre completo
            <span className="text-danger">*</span>
          </label>
          <input
            defaultValue={isGetData.name}
            type="text"
            className="form-control"
            placeholder="Nombre completo"
            autoComplete="off"
            {...register("name", {
              required: true,
              maxLength: 100,
              pattern: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/,
            })}
          />
          {errors.name && (
            <span className="text-danger">
              Dato requerido y alfanúmerico (Max. 100 caracteres)
            </span>
          )}
        </div>

        <div className="form-group mb-3">
          <label>
            Dirección
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Calle, Número, Colonia"
            autoComplete="off"
            {...register("address", {
              required: true,
              maxLength: 500,
            })}
            defaultValue={isGetData.address}
          />
          {errors.address && (
            <span className="text-danger">
              Dato requerido y alfanúmerico (Max. 500 caracteres)
            </span>
          )}
        </div>

  <div className="form-group mb-3">
          <label>
            Número telefónico
            <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control"
            placeholder="Número telefónico"
            autoComplete="off"
            {...register("phoneNumber", {
              required: true,
              pattern: /^[0-9]+$/,
              minLength: 10,
              maxLength: 10,
            })}
            defaultValue={isGetData.phoneNumber}
          />
          {errors.phoneNumber?.type === "required" && (
            <span className="text-danger">
              El número de teléfono es requerido
            </span>
          )}
          {errors.phoneNumber?.type === "pattern" && (
            <span className="text-danger">Ingrese solo números</span>
          )}
          {errors.phoneNumber?.type === "minLength" && (
            <span className="text-danger">Debe tener al menos 10 dígitos</span>
          )}
          {errors.phoneNumber?.type === "maxLength" && (
            <span className="text-danger">Debe tener 10 dígitos</span>
          )}
        </div>
        <div>
          <Modal.Footer>
            <button type="button" class="btn btn btn-light  btn-outline-danger"
          onClick={handleCloseModal}
          data-bs-dismiss="modal">Cancelar</button>
            <Button
              type="submit"
              onClick={() => {
                setGetDataFromTable({});
              }}
              disabled={!isValid}
            >
              {actionButtonModal}
            </Button>
          </Modal.Footer>
        </div>
      </form>
    </div>
  );
};
