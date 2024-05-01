import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import ListingPage from "./ListingPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import {
  setDashboardData,
  setMetaData,
  setLandlordDashboard,
  setAdminDashboard,
} from "../reducerAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropertyHome from "./PropertyHome";
import LandlordHome from "./LandlordHome";
import LandlordPropertyCreateEdit from "./LandlordPropertyCreateEdit";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import AccountSettings from "./AccountSettings";
import AdminReport from "./AdminReport";
import AdminVetPage from "./AdminVetPage";

const CustomRoutes = (props) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth > 850 ? false : true
  );
  const isBuyerLoggedIn = typeof props.dashboard?.isBuyer !== "undefined";
  const isLandlordLoggedIn =
    typeof props?.landlordDashboard?.isSeller !== "undefined";
  const isAdminLoggedIn = typeof props?.adminDashboard?.isAdmin !== "undefined";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) setIsMobile(false);
      else setIsMobile(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isLandlordLoggedIn={isLandlordLoggedIn}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
      />
      {/* <Route path="/" element={<LandlordHome navigate={navigate} {...props} />} /> */}
      <Route
        path="/listings"
        element={
          <ListingPage
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isLandlordLoggedIn={isLandlordLoggedIn}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="listings"
      />
      <Route
        path="/propertyScreen"
        element={
          <PropertyHome
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isLandlordLoggedIn={isLandlordLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="propertyScreen"
      />
      <Route
        path="/login"
        element={
          <LoginPage navigate={navigate} {...props} isMobile={isMobile} />
        }
        id="login"
      />
      <Route
        path="/signup"
        element={<SignupPage navigate={navigate} isMobile={isMobile} />}
        id="signup"
      />
      <Route
        path="/accountsettings"
        element={
          <AccountSettings
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isLandlordLoggedIn={isLandlordLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="accountsettings"
      />
      <Route
        path="/landlordCreateEdit"
        element={
          <LandlordPropertyCreateEdit
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isLandlordLoggedIn={isLandlordLoggedIn}
          />
        }
        id="landlordCreateEdit"
      />
      <Route
        path="/landlordHome"
        element={
          <LandlordHome
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isLandlordLoggedIn={isLandlordLoggedIn}
          />
        }
        id="landlordHome"
      />
      <Route
        path="/aboutUs"
        element={
          <AboutUs
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isLandlordLoggedIn={isLandlordLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="aboutUs"
      />
      <Route
        path="/contactUs"
        element={
          <ContactUs
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isBuyerLoggedIn={isBuyerLoggedIn}
            isLandlordLoggedIn={isLandlordLoggedIn}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="contactUs"
      />
      <Route
        path="/adminReport"
        element={
          <AdminReport
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="adminReport"
      />
      <Route
        path="/adminVetPage"
        element={
          <AdminVetPage
            navigate={navigate}
            {...props}
            isMobile={isMobile}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        }
        id="adminVetPage"
      />
    </Routes>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDashboardData,
      setMetaData,
      setLandlordDashboard,
      setAdminDashboard,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { dashboard, metadata, landlordDashboard, adminDashboard } = state;
  // console.log('propertyHome dashboard is',dashboard);
  return { dashboard, metadata, landlordDashboard, adminDashboard };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomRoutes);
