import React, { useEffect, useState } from "react";
import Button from "./interactionComponents/Button";
import logo from "../assets/logo.jpg";

const NavBar = (props) => {
  const {
    navigate,
    isBuyerLoggedIn,
    additionalNavItems,
    isMobile = false,
    isLandlordLoggedIn,
    isAdminLoggedIn,
    setDashboardData,
    setLandlordDashboard,
    setAdminDashboard,
  } = props;

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const loggedIn = isBuyerLoggedIn || isLandlordLoggedIn || isAdminLoggedIn;
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleHamburgerOpenStyles = () => {
    if (hamburgerOpen) {
      return "mt-2";
    }

    return "";
  };

  return (
    <div
      className="flex text-white bg-black py-4 px-3 flex-wrap text-lg"
      style={hamburgerOpen ? { display: "flex", flexDirection: "column" } : {}}
    >
      <div
        className="hamburger mr-2"
        onClick={(e) => setHamburgerOpen(!hamburgerOpen)}
      >
        <div className="burger burger1" />
        <div className="burger burger2" />
        <div className="burger burger3" />
      </div>
      <div
        className="visibility-check"
        style={
          hamburgerOpen
            ? { display: "flex", flexDirection: "column" }
            : isMobile
            ? { display: "none" }
            : { display: "flex", flexDirection: "row", flexBasis: "100%" }
        }
      >
        <img style={{ width: "2rem" }} src={logo} />
        <div
          className={`mr-auto cursor-pointer  ${handleHamburgerOpenStyles()} `}
          onClick={() => navigate("/")}
        >
          Home
        </div>
        <div
          className={`flex flex-wrap `}
          style={
            hamburgerOpen
              ? { display: "flex", flexDirection: "column", gap: "0.5rem" }
              : { gap: "3rem" }
          }
        >
          {/* <div className={`mr-auto flex-wrap cursor-pointer `} onClick={() => navigate("/")}>Home</div> */}
          {additionalNavItems}

          {true && <div
            className={`mr-auto flex-wrap cursor-pointer `}
            onClick={() => navigate("listings")}
          >
            View Listings
          </div>}
          {loggedIn &&
            !isBuyerLoggedIn &&
            isLandlordLoggedIn &&
            !isAdminLoggedIn && <div className={`mr-auto flex-wrap cursor-pointer `} onClick={() => navigate("landlordHome")}>My Listings</div>}

          {loggedIn &&
            !isBuyerLoggedIn &&
            !isLandlordLoggedIn &&
            isAdminLoggedIn && <div className={`mr-auto flex-wrap cursor-pointer `} onClick={() => navigate("adminReport")}>Report Dashboard</div>}
          
          {loggedIn &&
            !isBuyerLoggedIn &&
            !isLandlordLoggedIn &&
            isAdminLoggedIn && <div className={`mr-auto flex-wrap cursor-pointer `} onClick={() => navigate("adminVetPage")}>Pending Sellers</div>}

          <div
            className={`mr-auto flex-wrap cursor-pointer  `}
            onClick={() => navigate("aboutUs")}
          >
            About
          </div>
          <div
            className={`mr-auto flex-wrap cursor-pointer `}
            onClick={() => navigate("contactUs")}
          >
            Contact Us
          </div>
          {loggedIn && <div
            className={`mr-auto flex-wrap cursor-pointer `}
            onClick={() => navigate("accountsettings")}
          >
            Settings
          </div>}
          
          {!loggedIn && (
            <div
              className={`mr-auto cursor-pointer `}
              onClick={() => navigate("login")}
            >
              Login
            </div>
          )}
          {!loggedIn && (
            <div
              className={`mr-auto cursor-pointer `}
              onClick={() => navigate("signup")}
            >
              Get Started
            </div>
          )}
          {loggedIn && (
            <div
              className={`mr-auto cursor-pointer `}
              onClick={() => {
                navigate("/");
                isBuyerLoggedIn &&
                  setDashboardData("logout", {}, "buyerLogout");
                isLandlordLoggedIn &&
                  setLandlordDashboard("logout", {}, "sellerLogout");
                isAdminLoggedIn &&
                  setAdminDashboard("logout", {}, "adminLogout");
                // buyerLogout
              }}
            >
              Logout
            </div>
          )}
          {/* {loggedIn &&
            isBuyerLoggedIn &&
            !isLandlordLoggedIn &&
            !isAdminLoggedIn && (
              <Button
                onClick={() => navigate("listings")}
                title={"View Listings"}
              />
            )} */}
          {/* {loggedIn &&
            !isBuyerLoggedIn &&
            isLandlordLoggedIn &&
            !isAdminLoggedIn && (
              <Button
                onClick={() => navigate("landlordHome")}
                title={"Properties"}
              />
            )} */}
          {/* {loggedIn &&
            !isBuyerLoggedIn &&
            !isLandlordLoggedIn &&
            isAdminLoggedIn && (
              <Button
                onClick={() => navigate("adminReport")}
                title={"Report Dashboard"}
              />
            )} */}
          {/* {loggedIn &&
            !isBuyerLoggedIn &&
            !isLandlordLoggedIn &&
            isAdminLoggedIn && (
              <Button
                onClick={() => navigate("adminVetPage")}
                title={"Pending Sellers"}
              />
            )} */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
