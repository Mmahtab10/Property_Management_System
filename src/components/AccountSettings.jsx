import { React } from "react";
import NavBar from "./NavBarComponent";
import ListingBackground from "../assets/ListingBackground.png";
import editbutton from "../assets/editbutton.svg";
import { useState, useEffect } from "react";
import EditPasswordModal from "./interactionComponents/EditPasswordModal";
import EditEmailModal from "./interactionComponents/EditEmailModal";
import DeleteAccountModal from "./interactionComponents/DeleteAccountModal";

const AccountSettings = (props) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleShowPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const { navigate,
    isMobile,
    isBuyerLoggedIn,
    isLandlordLoggedIn,
    isAdminLoggedIn,
    dashboard,
    adminDashboard,
    landlordDashboard} = props;

  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleShowEmailModal = () => setShowEmailModal(true);
  const handleCloseEmailModal = () => setShowEmailModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [userID, setUserID] = useState();
  const [displayInfo, setDisplayInfo] = useState();

  useEffect(() => {
    if (isBuyerLoggedIn) {
      setUserID(dashboard.isBuyer.id);
      getInfo(dashboard.isBuyer.id);
    } else if (isLandlordLoggedIn) {
      setUserID(landlordDashboard.isSeller.id);
      getInfo(landlordDashboard.isSeller.id);
    } else {
      setUserID(adminDashboard.isAdmin.id);
      getInfo(adminDashboard.isAdmin.id);
    }
  }, [displayInfo]);


  async function getInfo(id)
  {
    const response = await fetch(`https://firsthome.me/users/getUserInfo?id=${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const temp = await response.json();
      setDisplayInfo(temp);
  }

    return (
      <div className="bg-black">
        <NavBar navigate={navigate} isMobile={isMobile} {...props}/>
        <div
          style={{
            backgroundColor: "black",
            // minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={ListingBackground}
            alt="Account Settings"
            style={{ width: "100%", height: "20vh" }}
          />
          <div style={{ fontSize: "40px", color: "white", textAlign: "center" }}>
            Account Settings
          </div>
          <div
            style={
              isMobile
                ? {
                    backgroundColor: "#D9D9D9",
                    // width: "80%",
                    border: "1px solid #ccc",
                    // padding: "20px",
                    minHeight: "50vh",
                    // marginLeft: "8vw",
                    display: "flex",
                    flexDirection: "column",
                  }
                : {
                    backgroundColor: "#D9D9D9",
                    // width: "100%",
                    margin: "1rem 5em 1em 5em",
                    border: "1px solid #ccc",
                    // padding: "20px",
                    // height: "70vh",
                    minHeight: "70vh",
                    // marginLeft: "8vw",
                    display: "flex",
                    flexDirection: "column",
                  }
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // marginLeft: "15vw",
                  fontSize: "20px",
                  alignItems: "center",
                  flexBasis: "100%",
                }}
              >
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={displayInfo?.[0]?.first_name}
                  disabled
                  style={{ padding: "10px" }}
                />
              </div>
  
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // marginLeft: "20vw",
                  fontSize: "20px",
                  alignItems: "center",
                  flexBasis: "100%",
                }}
              >
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={displayInfo?.[0]?.last_name}
                  disabled
                  style={{ padding: "10px" }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // marginLeft: "15vw",
                  fontSize: "20px",
                  alignItems: "center",
                  flexBasis: "100%",
                }}
              >
                <label
                  htmlFor="email"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Email{" "}
                  <img
                    src={editbutton}
                    alt="Edit"
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                    }}
                    onClick={handleShowEmailModal}
                  />
                </label>
                <input
                  type="email"
                  id="email"
                  value={displayInfo?.[0]?.email}
                  disabled
                  style={{ padding: "10px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // marginLeft: "15vw",
                  fontSize: "20px",
                  alignItems: "center",
                  flexBasis: "100%",
                }}
              >
                <label
                  htmlFor="password"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Password{" "}
                  <img
                    src={editbutton}
                    alt="Edit"
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      width: "18px",
                      height: "18px",
                    }}
                    onClick={handleShowPasswordModal}
                  />
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value="************"
                  disabled
                  style={{ padding: "10px" }}
                />
              </div>
            </div>
  
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "auto",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  width: "170px",
                  height: "70px",
                  backgroundColor: "red",
                  fontSize: "20px",
                  borderRadius: "0",
                  color: "white",
                }}
                onClick={handleShowDeleteModal}
              >
                Delete Account
              </button>
            </div>
            <EditPasswordModal
              show={showPasswordModal}
              handleClose={handleClosePasswordModal}
              userID={userID}
            />
            <EditEmailModal
              show={showEmailModal}
              handleClose={handleCloseEmailModal}
              userID={userID}
            />
            <DeleteAccountModal
              show={showDeleteModal}
              handleClose={handleCloseDeleteModal}
              userID={userID}
              navigate={navigate}
              {...props}
            />
          </div>
        </div>
      </div>
    );


};

export default AccountSettings;
