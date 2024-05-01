import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const EditPasswordModal = ({ show, handleClose, userID }) => {
  const [newPassword, setNewPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [passwordmatch, setPasswordmatch] = useState(false);
  const [failedChange, setFailedChange] = useState(false);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    console.log(newPassword);
  };

  const handleReenteredPassword = (e) => {
    setReenteredPassword(e.target.value);
    console.log(reenteredPassword);
  };

  async function modifyPassword() {
    setFailedChange(false);
    if (newPassword === reenteredPassword) {
      const data = {
        id: userID,
        newPassword: newPassword,
      };
      const response = await fetch(
        "https://firsthome.me/users/updatePassword",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log(response);
        setPasswordmatch(false);
        handleClose();
      } else {
        setFailedChange(true);
      }
    } else {
      setPasswordmatch(true);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ marginBottom: "-60px" }}>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              autoFocus
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Re-Enter New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter New Password"
              onChange={handleReenteredPassword}
            />
          </Form.Group>
          {passwordmatch && (
            <div className="text-red-400 mt-3">The passwords do not match.</div>
          )}
          {failedChange && (
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
          style={{
            backgroundColor: "black",
            color: "white",
            width: "90px",
            height: "40px",
          }}
          onClick={() => modifyPassword()}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPasswordModal;
