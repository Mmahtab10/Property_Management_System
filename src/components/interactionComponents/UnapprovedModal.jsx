import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UnapprovedModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className="mt-40">
      <Modal.Header closeButton>
        <Modal.Title>Unapproved Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your realtor account has not been approved by an admin. Make sure you
        have emailed the proper documents to firsthomeadmins@gmail.com. The
        approval process can take a few business days.
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            width: "8rem",
            height: "3rem",
          }}
          onClick={handleClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnapprovedModal;
