import { React, useState, useEffect } from "react";
import NavBar from "./NavBarComponent";
import "./styles/Signup.css";
import "./styles/Login.css";
import UnapprovedModal from "../components/interactionComponents/UnapprovedModal";

const LoginPage = ({
  navigate,
  isMobile,
  setAdminDashboard,
  setDashboardData,
  setLandlordDashboard,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showUnapprovedModal, setshowUnapprovedModal] = useState(false);
  const handleShowUnapprovedModal = () => setshowUnapprovedModal(true);
  const handleCloseUnapprovedModal = () => setshowUnapprovedModal(false);

  const [invalidMessage, setInvalidMessage] = useState(false);

  async function login() {
    setInvalidMessage(false);
    const logindata = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("https://firsthome.me/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindata),
      });
      if (!response.ok) {
        if (response.status === 404) {
          setInvalidMessage(true);
        } else if (response.status === 401) {
          setInvalidMessage(true);
        } else if (response.status === 403) {
          handleShowUnapprovedModal();
        }
      } else {
        const temp = await response.json();
        if (temp.userType === "Buyer") {
          setDashboardData("isBuyer", temp);
        } else if (temp.userType === "Seller") {
          setLandlordDashboard("isSeller", temp);
        } else {
          setAdminDashboard("isAdmin", temp);
        }
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <NavBar navigate={navigate} isMobile={isMobile} />
      <div className="background-picture">
        <div className="white-container-two">
          <div className="signup-header">Login</div>
          <label style={{ width: "100%", padding: "0em 5em 0em 5em" }}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              style={{ width: "100%" }}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
          <label style={{ width: "100%", padding: "0em 5em 0em 5em" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              style={{ width: "100%" }}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          {invalidMessage && (
            <div className="text-red-400 mt-3">
              The email or password you have entered is incorrect.
            </div>
          )}
          <div className="no-acc">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signUp")} style={{cursor: "pointer"}}>Signup Here</a>
          </div>
          <button
            className="submit-btn"
            style={{ width: "fit-content", padding: "1rem" }}
            onClick={() => login()}
          >
            Login
          </button>
        </div>
        <UnapprovedModal
          show={showUnapprovedModal}
          handleClose={handleCloseUnapprovedModal}
        />
      </div>
    </div>
  );
};

export default LoginPage;
