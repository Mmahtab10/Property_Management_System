import React, { useEffect, useState } from "react";
import NavBar from "./NavBarComponent";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { FormSelect } from "react-bootstrap";
import BedImage from "../assets/BedImage.png";
import BathImage from "../assets/BathImage.png";
import SqFeetImage from "../assets/SqFeetImage.png";
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
import HouseListingImage1 from "../assets/HouseListingImage1.png";
import HouseListingImage2 from "../assets/HouseListingImage2.png";
import HouseListingImage3 from "../assets/HouseListingImage3.png";
import HouseListingImage4 from "../assets/HouseListingImage4.png";
import Button from "./interactionComponents/Button";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Input from "./interactionComponents/Input";
import { Modal } from "react-bootstrap";
import FooterComp from "./FooterComp";
import { contactSeller, reportAListing, searchListingById } from "../apiUtil";
import backarrowtwo from "../assets/back-arrow-previous.svg";
import { Carousel } from "react-bootstrap";


const Description = ({ currentListing = {}, isMobile }) => {
  return (
    <div className={`flex flex-col ${isMobile ? "" : "p-8"}`}>
      <div
        className="flex flex-row font-semibold text-center flex-wrap"
        style={{ fontSize: `${isMobile ? "" : "1.5em"}` }}
      >
        <div className="flex flex-col basis">
          <div className="mr-auto text-5xl font-normal">For Sale</div>
          <div className="mr-auto text-5xl mt-3 font-normal mb-3">
            ${currentListing.price}
          </div>
          <div
            className="flex flex-row font-normal border-t-2 border-black items-center"
            style={{ fontSize: `${isMobile ? "" : "2.5em"}` }}
          >
            <div
              className="flex flex-row grow justify-center items-center border-r-2 gap-2 border-black"
              style={{ fontSize: `${isMobile ? "" : "0.5em"}` }}
            >
              <div className="flex-col px-5" style={{ minWidth: "40%" }}>
                <div>Beds</div>
                <div className="flex justify-center gap-2">
                  <img src={BedImage} />
                  {currentListing.bed}
                </div>
              </div>
            </div>
            <div
              className="flex flex-row grow justify-center items-center border-r-2 gap-2 border-black"
              style={{ fontSize: `${isMobile ? "" : "0.5em"}` }}
            >
              <div className="flex-col px-5" style={{ minWidth: "40%" }}>
                <div>Baths</div>
                <div className="flex justify-center gap-2">
                  <img src={BathImage} />
                  {currentListing.bath}
                </div>
              </div>
            </div>
            <div
              className="flex flex-row grow justify-center items-center gap-2 border-black"
              style={{ fontSize: `${isMobile ? "" : "0.5em"}` }}
            >
              <div className="flex-col px-5" style={{ minWidth: "30%" }}>
                <div>Sq Feet</div>
                <div className="flex justify-center gap-2">
                  <img src={SqFeetImage} />
                  {currentListing.squareFootage} ft
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`font-normal ${isMobile ? "" : "ml-auto w-50"}`}
          style={{ fontSize: `${isMobile ? "" : "1.5em"}` }}
        >
          Address: {currentListing.address}
        </div>
      </div>
      <div className="flex flex-col">
        <div
          className="py-4"
          style={{ fontSize: `${isMobile ? "" : "2.0em"}` }}
        >
          Property Description:
        </div>
        <div style={{ fontSize: `${isMobile ? "" : "1.3em"}` }}>
          {currentListing.propertyDescription}
        </div>
      </div>
    </div>
  );
};

const MapView = ({ currentListing, center }) => {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "60vh",
  };

  return (
    <div className="flex flex-row justify-center flex-wrap">
      <Map
        google={google}
        zoom={15}
        containerStyle={containerStyle}
        center={center}
      >
        <Marker position={center} />
      </Map>
    </div>
  );
};

const ContactSeller = ({ dashboard, setDashboardData, isBuyerLoggedIn, navigate }) => {
  const { sellerContactMessage, buyerEmail = "" } = dashboard;

  useEffect(() => {
    // if (!sellerContactMessage) {
    //   setDashboardData(
    //     "sellerContactMessage",
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo tortor, imperdiet sit amet fermentum pulvinar, aliquet a lectus. Morbi interdum accumsan elit, eget luctus risus ultrices non. Phasellus vitae sagittis justo. Nam aliquam sapien vitae ornare ullamcorper. Vestibulum mollis libero sed sem bibendum, eget elementum purus euismod. Etiam dictum dapibus dignissim. Donec in ornare tellus. Donec semper, nibh id tincidunt auctor, ex turpis congue lectus, eget egestas ligula tellus a leo. Sed vitae lectus sapien. Sed sed cursus nibh, a ultrices libero. Sed cursus mi sit amet lacus fermentum, at maximus ex pellentesque. Praesent condimentum ut mi a volutpat. Donec tempus placerat iaculis. Aliquam nec nunc id ligula eleifend convallis eu in libero. Cras condimentum consequat facilisis. Ut varius hendrerit diam, vel euismod felis maximus ut. Praesent accumsan quam est, non convallis odio dignissim vel. Nullam orci enim, pharetra sed iaculis vitae, luctus pellentesque arcu. Sed tristique tortor nisi, quis laoreet neque pretium et. Vestibulum lectus ante, efficitur at risus ac, vestibulum aliquam augue. Nulla dapibus scelerisque neque sit amet aliquet."
    //   );
    // }
  }, []);

  return (
    <div className="flex flex-col p-7 flex-wrap text-black">
      {/* <div className="flex flex-col " style={{ fontSize: "20px" }}>
        <div style={{ fontSize: "28px" }} className=" font-semibold">
          Email
        </div>
        <Input
          inputClass="w-2/6"
          placeholder="example@gmail.com"
          value={buyerEmail}
          onChange={(e) => {
            e.stopPropagation();
            setDashboardData("buyerEmail", e.target.value);
          }}
        />
      </div> */}
      <div className="py-5">
        <div className="flex flex-col" style={{ fontSize: "20px" }}>
          <div style={{ fontSize: "28px" }} className=" font-semibold mb-2">
            Enter Message here
          </div>
          <textarea
            className="bg-white h-64"
            onChange={(e) =>
              setDashboardData("sellerContactMessage", e.target.value)
            }
            value={sellerContactMessage || ""}
            name="sellerContactMessageForm"
            disabled={!isBuyerLoggedIn}
            style={isBuyerLoggedIn ? {cursor: "text"} : {}}
          />
        </div>
      </div>
      <div className="flex flex-row self-center">
        <Button title={"Send"} onClick={(e) => {
          if (sellerContactMessage) {
            const payload = {
              listingId: dashboard?.currentListing?.id,
              "buyerId": dashboard.isBuyer?.id,
              "message": sellerContactMessage
            }
            contactSeller(payload).then(response => {
              window.alert("Emailed Seller Successfully");
              navigate("/listings");
            });
          }
        }} buttonClass="bg-cyan-600 p-2.5" />
      </div>
    </div>
  );
};

const PropertyHome = (props) => {
  const {
    navigate,
    setDashboardData,
    dashboard = {},
    metadata,
    setMetaData,
    google,
    adminDashboard,
    setAdminDashboard,
    isBuyerLoggedIn,
    isMobile,
    isAdminLoggedIn,
    isLandlordLoggedIn
  } = props;
  const currentListing =
    dashboard.currentListing || adminDashboard.currentListing || {};
  const isAdminRender = adminDashboard?.currentListing ? true : false;
  const reportReason = adminDashboard?.currentListing?.reportReason;
  // const currentListing = { price: 498573, address: '2500 University Dr, Calgary, AB, Canada', bed: 2, bath: 2, squareFootage: 3567 };
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [show, setShow] = useState(false);
  const { reportText } = dashboard;

  const toggleState = async (toReport) => {
    if (isBuyerLoggedIn && toReport) {
      const currentDate = new Date();

      // Extract year, month, and day components from the current date
      const year = currentDate.getFullYear();
      // January is month 0, so we add 1 to get the actual month
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
      const day = String(currentDate.getDate()).padStart(2, '0'); // Ensure two-digit day
      // Construct the date string in YYYY-MM-DD format
      const dateReported = `${year}-${month}-${day}`;
      const reportPayload = {
        idListing: currentListing?.idListing || currentListing?.id,
        reportReason: reportText,
        dateReported: dateReported,
        userID: dashboard?.isBuyer?.id,
      };
      await reportAListing(reportPayload)?.then(() => {
        setShow((currentState) => {
          return !currentState;
        });
      });
    } else {
      setShow((currentState) => {
        return !currentState;
      });
    }
  };

  useEffect(() => {
    if (
      isAdminRender &&
      Object.keys(currentListing).length &&
      !currentListing.address
    ) {
      // API Comment
      searchListingById({ id: currentListing.idListing }).then((response) => {
        setAdminDashboard("currentListing", {
          ...currentListing,
          ...response[0],
        });
      });
    }
  }, []);
  const [listingImages, setListingImages] = useState([]);
  useEffect(() => {
    if (google && currentListing.address) {
      const geoCode = new google.maps.Geocoder();
      geoCode.geocode(
        {
          address: currentListing.address,
        },
        (results) => {
          const result = results[0].geometry.location;
          setCenter({ lat: result.lat(), lng: result.lng() });
        }
      );
    }
  }, [google, currentListing.address]);

  useEffect(() => {
    if (currentListing.images) {
      const temp = currentListing.images.split(",");
      setListingImages(temp);
    }
  }, [currentListing.images]);

  const images = [
    HouseListingImage1,
    HouseListingImage2,
    HouseListingImage3,
    HouseListingImage4,
  ];

  async function adminChangeStatus(status) {
    const postingData = {
      id: currentListing.idListing,
      status: status
    };
      const response = await fetch("https://firsthome.me/reports/updatePostingStatus", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postingData),
      });  
      console.log(response);
      navigate("/adminReport")
  }

  return (
    <div className="text-white bg-black flex flex-col">
      <div className=" bg-black">
        <NavBar {...props} navigate={navigate} isMobile={isMobile} />
      </div>
      {isAdminRender ? (
        <img
          src={backarrowtwo}
          style={{
            width: "3rem",
            backgroundColor: "white",
            marginBottom: "1rem",
            marginTop: "1rem",
            marginLeft: "1rem",
          }}
          onClick={() => navigate("/adminReport")}
        ></img>
      ) : (
        <img
          src={backarrowtwo}
          style={{
            width: "3rem",
            backgroundColor: "white",
            marginBottom: "1rem",
            marginTop: "1rem",
            marginLeft: "1rem",
          }}
          onClick={() => navigate("/listings")}
        ></img>
      )}

      <div className="flex flex-row justify-center items-center flex-wrap">
        <Carousel slide={false} interval={null} data-bs-theme="dark">
          {listingImages.map((url, index) => (
            <Carousel.Item key={index}>
              <img
                src={url}
                alt="uploaded"
                className="image"
                style={{ width: "50rem", height: "30rem" }}
              ></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className={`${isMobile ? "mx-5 py-5" : "mx-20 py-20"} `}>
        {isAdminRender && (
          <div
            className="flex flex-col bg-light-grey font-semibold flex-wrap text-black mb-4 p-4"
            style={{ fontSize: `${isMobile ? "" : "2em"}` }}
          >
            <div
              style={{ fontSize: `${isMobile ? "" : "1.5em"}` }}
              className="mb-2 underline"
            >
              Reported Reason
            </div>
            <div className="bg-light-grey " name="reportReason">
              {reportReason}
            </div>
          </div>
        )}

        <Tabs
          defaultActiveKey="description"
          id="property-tabs"
          className=""
          justify
        >
          <Tab
            eventKey="description"
            title="Description"
            className="bg-light-grey rounded-md mb-3"
          >
            <Description currentListing={currentListing} isMobile={isMobile} />
          </Tab>
          <Tab eventKey="map" title="Map" className="">
            <MapView currentListing={currentListing} center={center} />
          </Tab>
          <Tab
            eventKey="contactSeller"
            title="Contact Seller"
            className="bg-light-grey rounded-md mb-3"
          >
            <ContactSeller
              dashboard={dashboard}
              setDashboardData={setDashboardData}
              isBuyerLoggedIn={isBuyerLoggedIn}
              navigate={navigate}
            />
          </Tab>
        </Tabs>
        {isAdminRender ? (
          <div className="flex flex-row justify-center pt-5">
            <div
              className="flex flex-col text-center"
              style={{ fontSize: "2.5rem" }}
            >
              Resolve Listing
              <div
                className="flex flex-row flex-wrap"
                style={{ fontSize: "1.5rem" }}
              >
                <Button
                  title={"Take Down Listing"}
                  onClick={() => adminChangeStatus("Taken Down")}
                  buttonClass=" bg-red-600 text-black mx-1 p-2.5"
                />
                <Button
                  title={"Re-Instate Listing"}
                  onClick={() => adminChangeStatus("Re-Instate")}
                  buttonClass=" bg-red-600 text-black mx-1 p-2.5"
                />
                {/* <Button
                  title={"Go back"}
                  onClick={() => navigate("adminReport")}
                  buttonClass=" bg-red-600 text-black mx-1"
                /> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center pt-5 items-end flex-wrap">
            <div className="flex flex-col">
              See an issue? Report this listing here
              <Button
                title={"Report Listing"}
                onClick={() => toggleState(false)}
                buttonClass=" bg-red-600 text-black mx-5"
                isDisabled={!isBuyerLoggedIn}
              />
            </div>
            {/* <Button
              title={"Go back"}
              onClick={() => navigate("/listings")}
              buttonClass={`bg-red-600 text-black mx-5 ${
                isMobile ? "mt-2" : ""
              }`}
            /> */}
          </div>
        )}
      </div>
      <FooterComp ignoreAbsolute {...props} />
      <Modal show={show} onHide={toggleState}>
        <Modal.Header closeButton>
          <Modal.Title className=" font-bold">Report this Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="bg-white h-64 w-full"
            onChange={(e) => setDashboardData("reportText", e.target.value)}
            value={reportText || ""}
            name="reportSeller"
            placeholder="Enter Reason"
          />
        </Modal.Body>
        <Modal.Footer className=" flex flex-row">
          <Button
            buttonClass="text-white bg-black w-full"
            variant="secondary"
            onClick={() => toggleState(true)}
            title={"Save Changes"}
          />
          <Button
            buttonClass="text-white bg-black w-full"
            variant="primary"
            onClick={() => toggleState(false)}
            title={"Close"}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const LoadingContainer = () => <div>Loading....</div>;

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  LoadingContainer: LoadingContainer,
})(PropertyHome);
