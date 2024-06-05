import React, { useState, useContext } from "react";
import "../../Css/CssTable.css";
import { GetTheAppContext } from "../../context/AppContext";
import { ModalGeneric } from "../Modal/modal";
import { ModalDelete } from "../Modal/ModalDelete";
import { MdDeleteForever } from "react-icons/md";
import { BsPersonFillAdd, BsPencilFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { statusOk } from "../HttpStatus/HTTPStatusCode";

export function TablaGeneric({ title, data }) {
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleShowModalDelete = () => {
    setShowModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const {
    handleShowModal,
    handleCloseModal,
    showModal,
    setGetDataFromTable,
    setActionButtonModal,
    setemployeeId,
    setDataUseremployee,
    employeeId,
    deleteemployeeFunction,
    getAllemployeeDataFunction,
    setDataAllemployee,
    setTextAlert,
    handleShowFloatAlter,
    dataUseremployee,
    token
  } = useContext(GetTheAppContext);

  const displayedFields = [
    "name",
    "phoneNumber",
    "address",
  ];


  const funtionToDeleted = async () => {
    setActionButtonModal("Eliminar");
    const response = await deleteemployeeFunction(employeeId);
    if (response.status === statusOk) {
      await getAllemployeeDataFunction(setDataAllemployee);
      handleCloseModalDelete();
      setTextAlert(`Se eliminó al médico ${dataUseremployee.name}`);
      handleShowFloatAlter();
    } else {
      handleCloseModalDelete();
      setTextAlert("Error al eliminar el médico");
      handleShowFloatAlter();
    }
  };

  console.log(data);

  return (
    <div className="container mt-5">
      <div className=" card mt-4 row">
        <div className="card-header d-flex">
          <div className="col-8">
            <h2 className="card-title">{title}</h2>
          </div>

          <div className="col-4 d-flex flex-row-reverse ">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-clear">Agregar</Tooltip>}
            >
              <Button
                id="btnAdd"
                className="ms-2 me-2 mb-1"
                variant="primary"
                onClick={() => {
                  handleShowModal();
                  setActionButtonModal("Agregar");
                }}
              >
                <BsPersonFillAdd size={18} />
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        

            <table className="table table-bordered custom-table text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody>
              {data.map((item, index) => (
              <tr key={index}>
                {displayedFields.map((field) => (
                  <td key={field}>
                    <div id="idTextPatient" className="d-inline">
                      {item[field]}
                    </div>
                  </td>
                ))}
                    <td className="Buttons">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-clear">Editar</Tooltip>}
                      >
                        <Button
                          size={13}
                          id="btnTables"
                          className="ms-2 me-2 mb-2 mt-2"
                          variant="primary"
                          onClick={() => {
                            handleShowModal();
                            setemployeeId(item.id);
                            setGetDataFromTable(item);
                            setActionButtonModal("Editar");
                          }}
                        >
                          <BsPencilFill className="btn-icon-lg" />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-clear">Eliminar</Tooltip>}
                      >
                        <Button
                          size={16}
                          id="btnTables"
                          className="ms-2 me-2 mb-2 mt-2 d-inline "
                          variant="danger"
                          onClick={() => {
                            setemployeeId(item.id);
                            setDataUseremployee(item);
                            handleShowModalDelete();
                          }}
                        >
                          <MdDeleteForever
                            size={13}
                            onClick={() => {
                              setDataUseremployee(item);
                            }}
                            id="btnDeletePatient"
                            className="btn-icon-lg"
                          />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ModalGeneric show={showModal} handleClose={handleCloseModal} title={"Médico"} />
          <ModalDelete
            show={showModalDelete}
            handleClose={handleCloseModalDelete}
            funtionToDeleted={funtionToDeleted}
            messageToDelete={"¿Está seguro que desea eliminar este empleado?"}
          />
        </div>
  );
}
