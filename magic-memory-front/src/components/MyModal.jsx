import React from "react";
import { Button, Modal } from "react-bootstrap";

function MyModal({ show, onHide, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        {children}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>

    </Modal>
  );
}

export default MyModal;
