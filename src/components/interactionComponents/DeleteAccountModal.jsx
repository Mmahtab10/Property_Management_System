import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DeleteAccountModal = ({ show, handleClose, userID, navigate, isBuyerLoggedIn, setDashboardData, isLandlordLoggedIn, setLandlordDashboard, isAdminLoggedIn, setAdminDashboard}) => {
  async function deleteAcc() {
    const data = { id: userID };
    const response = await fetch("https://firsthome.me/users/deleteUser", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      handleClose();
      alert("You have successfully deleted your account.");
      navigate("/");
      isBuyerLoggedIn &&
      setDashboardData("logout", {}, "buyerLogout");
      isLandlordLoggedIn &&
      setLandlordDashboard("logout", {}, "sellerLogout");
      isAdminLoggedIn &&
      setAdminDashboard("logout", {}, "adminLogout");
    }
  }

  return (
    <Modal show={show} onHide={handleClose} style={{ textAlign: "center" }}>
      <Modal.Header closeButton style={{ marginBottom: "-60px" }}>
        <Modal.Title style={{ fontSize: "40px" }}>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label style={{ fontSize: "25px" }}>
              Are you sure you want to delete your account?
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold" }}>
              *This action is Irreversible and your Account cannot be Recovered.
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <button
          style={{
            width: "170px",
            height: "70px",
            backgroundColor: "black",
            fontSize: "20px",
            borderRadius: "10px",
            color: "white",
          }}
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          style={{
            width: "170px",
            height: "70px",
            backgroundColor: "red",
            fontSize: "20px",
            borderRadius: "10px",
            color: "white",
          }}
          onClick={() => deleteAcc()}
        >
          Delete Account
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
