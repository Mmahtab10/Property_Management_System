import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const EditEmailModal = ({ show, handleClose, userID }) => {
  const [newEmail, setNewEmail] = useState("");
  const [reenteredEmail, setReenteredEmail] = useState("");
  const [match, setMatch] = useState(false);
  const [failedMailChange, setFailedMailChange] = useState(false);

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
    console.log(newEmail);
  };

  const handleReenteredEmail = (e) => {
    setReenteredEmail(e.target.value);
    console.log(reenteredEmail);
  };

  async function modifyEmail() {
    setMatch(false);
    setFailedMailChange(false);
    if (newEmail === reenteredEmail) {
      const data = {
        id: userID,
        newEmail: newEmail,
      };
      const response = await fetch("https://firsthome.me/users/updateEmail", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        setMatch(false);
        handleClose();
      } else {
        setFailedMailChange(true);
      }
    } else {
      setMatch(true);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ marginBottom: "-60px" }}>
        <Modal.Title>Change Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>New Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="New Email"
              autoFocus
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Re-Enter New Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Re-enter New Email"
              onChange={handleReenteredEmail}
            />
          </Form.Group>
          {match && (
            <div className="text-red-400 mt-3">The emails do not match.</div>
          )}
          {failedMailChange && (
            <div className="text-red-400 mt-3">
              Something went wrong, please try again later.
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            width: "90px",
            height: "40px",
          }}
          onClick={handleClose}
        >
          Close
        </button>
        <button
          onClick={() => modifyEmail()}
          style={{
            backgroundColor: "black",
            color: "white",
            width: "90px",
            height: "40px",
          }}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmailModal;
