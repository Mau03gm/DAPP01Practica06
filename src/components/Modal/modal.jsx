import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Formemployee } from "../employee/Formemployee";
import { GetTheAppContext } from "../../context/AppContext";

export const ModalGeneric = ({ show, handleClose, title, type }) => {
  const { setGetDataFromTable, getDataFromTable, actionButtonModal } =
  useContext(GetTheAppContext);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        handleClose();
        setGetDataFromTable({});
      }}
    >
      <Modal.Header >
        <Modal.Title>{actionButtonModal} {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Formemployee isGetData={getDataFromTable} />;
      </Modal.Body>
    </Modal>
  );
};
