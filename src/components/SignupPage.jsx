import { React, useState, useEffect } from "react";
import NavBar from "./NavBarComponent";
import "./styles/Signup.css";
import SellerUnapprovedModal from "./interactionComponents/SellerSignupUnapprovedModal";

const SignupPage = ({ navigate, isMobile }) => {
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [seller, setSeller] = useState("Buyer");
  const [reset, setReset] = useState(false);

  const [showUnapprovedModal, setshowUnapprovedModal] = useState(false);
  const handleShowUnapprovedModal = () => setshowUnapprovedModal(true);
  const handleCloseUnapprovedModal = () => {setshowUnapprovedModal(false); navigate("/")}

  useEffect(() => {
    setReset(false);
  }, [reset]);

  async function registerNewUser() {
    if (password !== repassword) {
      alert("Password do not match");
      return;
    }
    const registerdata = {
      email: email,
      first_name: fn,
      last_name: ln,
      password: password,
      userType: seller,
    };
    try {
      const response = await fetch("https://firsthome.me/users/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerdata),
      });
      if (!response.ok) {
        alert("Something went wrong. Please try again.");
      } else {
        if (seller === "Seller") {
          handleShowUnapprovedModal();
          setReset(true);
        } else {
          alert("You have successfully registered.");
          navigate("/login");
        }
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  }
  return (
    <div>
      <NavBar navigate={navigate} isMobile={isMobile} />
      <div className="background-picture">
        <div className="white-container">
          <div className="signup-header">Sign Up</div>
          <label style={{ width: "100%", padding: "0em 5em 0em 5em" }}>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
              style={{ width: "100%" }}
              onChange={(event) => {
                setFn(event.target.value);
              }}
            />
          </label>
          <label style={{ width: "100%", padding: "0em 5em 0em 5em" }}>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
              style={{ width: "100%" }}
              onChange={(event) => {
                setLn(event.target.value);
              }}
            />
          </label>
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
          <label style={{ width: "100%", padding: "0em 5em 0em 5em" }}>
            <input
              type="password"
              name="repassword"
              placeholder="Re-enter Password"
              required
              style={{ width: "100%" }}
              onChange={(event) => {
                setRepassword(event.target.value);
              }}
            />
          </label>
          <label style={{ width: "100%", padding: "0em 5em 0em 5em" }}>
            <input
              type="checkbox"
              name="isSeller"
              onChange={(event) =>
                setSeller(event.target.checked ? "Seller" : "Buyer")
              }
            />
            <span style={{ marginLeft: "0.5rem" }}>Are you a realtor?</span>
          </label>
          <button
            className="submit-btn"
            style={{ width: "fit-content", padding: "1rem" }}
            onClick={() => registerNewUser()}
          >
            Sign Up
          </button>
          <SellerUnapprovedModal
          show={showUnapprovedModal}
          handleClose={handleCloseUnapprovedModal}
        />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
