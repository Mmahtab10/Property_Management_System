import React, { useEffect } from "react";
import NavBar from "./NavBarComponent";
import Button from "./interactionComponents/Button";
import { Card, Form, FormSelect, InputGroup } from "react-bootstrap";
import ListingHouseImage from "../assets/ListingHouseImage.png";
import BedImage from "../assets/BedImage.png";
import BathImage from "../assets/BathImage.png";
import SqFeetImage from "../assets/SqFeetImage.png";
import _ from "lodash";
import FooterComp from "./FooterComp";
import { getAllSellerListings } from "../apiUtil";
import axios from "axios";

const ListingsList = ({
  landlordDashboard,
  setLandlordDashboard,
  navigate,
  isMobile
}) => {
  const { currentListings = [] } = landlordDashboard;
  async function urlToFile(url) {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const filename = url.substring(url.lastIndexOf("/") + 1);
      const file = new File([blob], filename, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error converting URL to file:", error);
      return null;
    }
  }

  const handlePropertyClick = async (e, i) => {
    navigate("landlordCreateEdit");
    e.stopPropagation();
    setLandlordDashboard("currentListing", {
      ...currentListings[i],
      isEditMode: true,
    });
    const temp = await urlToFile(
      "https://bucket-firsthome.s3.us-west-2.amazonaws.com/img3.jpg"
    );
    console.log(temp);
  };

  return (
    <div className="flex flex-col gap-2 landlord-listing-padding mt-4 w-full">
      {currentListings.map((listing, i) => {
        const imageUrls = listing.images.split(",");
        const firstImageUrl = imageUrls[0];
        return (
          <Card
            style={{}}
            onClick={(e) => handlePropertyClick(e, i)}
            className=" cursor-pointer"
          >
            <Card.Body className="flex flex-row flex-wrap justify-between">
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Img src={firstImageUrl} className="w-96 h-64" />
              <div className="flex flex-col gap-3 basis-40-percent justify-center">
                <Card.Text
                  className=" flex-col"
                  style={{
                    fontSize: "3rem",
                    marginBottom: "2.5rem",
                    marginTop: "1rem",
                  }}
                >
                  $ {listing.price}
                </Card.Text>
                <Card.Text className="flex-col" style={{ fontSize: "1.5rem" }}>
                  Address: {listing.address}
                </Card.Text>
                <Card.Text className="border-y-2 border-black flex flex-row justify-between half-width-reponsive mt-10">
                  <Card.Text className=" text-center border-l-2 border-black grow flex flex-col">
                    Bed
                    <Card.Text className="flex flex-row justify-around  p-2">
                      <Card.Img src={BedImage} style={{ width: "40%" }} />
                      {listing.bed}
                    </Card.Text>
                  </Card.Text>
                  <Card.Text className="text-center border-l-2 border-black grow  p-2">
                    Bath
                    <Card.Text className="flex flex-row justify-around">
                      <Card.Img src={BathImage} style={{ width: "40%" }} />
                      {listing.bath}
                    </Card.Text>
                  </Card.Text>
                  <Card.Text className="text-center border-x-2 border-black  p-2">
                    Square Feet
                    <Card.Text className="flex flex-row justify-around">
                      <Card.Img src={SqFeetImage} style={{ width: "30%" }} />
                      {listing.squareFootage}
                    </Card.Text>
                  </Card.Text>
                </Card.Text>
              </div>
              <div
                className={`flex flex-col justify-center border-black items-center gap-4 left-border basis-15-percent ${isMobile ? "basis-full" : ""} `}
                style={{ fontSize: "1.25rem" }}
              >
                <div className="">For {listing.type}</div>
                <div className="flex">
                  Status:{" "}
                  <div
                    className={` pl-1 ${
                      listing.status === "Posted"
                        ? "text-lime-400"
                        : listing.status === "In Review"
                        ? "text-yellow-500"
                        : "text-red-700"
                    }`}
                  >
                    {listing.status}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

const LandlordHome = (props) => {
  const {
    navigate,
    landlordDashboard,
    setLandlordDashboard,
    setDashboardData,
    isMobile,
  } = props;

  const additionalNavItems = (
    // <div className=" mr-auto flex-wrap cursor-pointer" onClick={() => navigate('')}>Post a Listing</div>
    <></>
  );

  var streetNumber = ["25489", "87459", "35478", "15975", "95125", "78965"];
  var streetName = [
    "A street",
    "B street",
    "C street",
    "D street",
    "E street",
    "F street",
  ];
  var cityName = [
    "Calgary",
    "Edmonton",
    "Airdrie",
    "Okotoks",
    "Toronto",
    "Vancover",
    "Halifax",
  ];
  var stateName = [
    "Alberta",
    "Ontario",
    "British Columbia",
    "Manitoba",
    "Montreal",
  ];
  var zipCode = ["28889", "96459", "35748", "15005", "99625", "71465"];
  const status = ["Posted", "In Review", "Taken Down"];

  var template = [
    streetNumber,
    " ",
    streetName,
    ", ",
    cityName,
    ", ",
    stateName,
    ", ",
    zipCode,
  ];

  function getRandomAddress() {
    return template.map(getRandomElement).join("");
  }

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  function getRandomElement(array) {
    if (array instanceof Array)
      return array[Math.floor(Math.random() * array.length)];
    else return array;
  }

  const onClickPostListing = (e) => {
    e.stopPropagation();
    setLandlordDashboard("currentListing", {});
    navigate("landlordCreateEdit");
  };

  useEffect(() => {
    // const listings = Array(30).fill(0).map(() => { return { price: randomNumber(300000, 500000), address: getRandomAddress(), bed: randomNumber(1, 4), bath: randomNumber(1, 4), squareFootage: randomNumber(2000, 5000), status: getRandomElement(status) } });
    const getListings = async () => {
      const sellerId = landlordDashboard?.isSeller?.id;
      const response = await getAllSellerListings({ sellerId });
      Array.isArray(response) &&
        setLandlordDashboard("currentListings", response);
    };
    getListings();
  }, []);

  return (
    <>
    <div className="text-white text-lg bg-black" style={{height: landlordDashboard?.currentListings?.length < 2 ? "80vh" : ""}}>
      <div className="flex flex-col">
        <NavBar
          navigate={navigate}
          additionalNavItems={additionalNavItems}
          isMobile={isMobile}
          {...props}
        />
        <div className="m-20">
          <div className={`flex flex-row flex-wrap ${isMobile ? "" : "ml-20"} `}>
            <div
              className="font-semibold"
              style={{
                fontSize: "1.5rem",
                height: landlordDashboard?.currentListings?.length
                  ? ""
                  : "50vh",
                marginLeft: "3rem",
              }}
            >
              Your Listings
            </div>
            <Button
              title={"Post Listing +"}
              buttonClass="mr-5 bg-cyan-600 p-2.5 ml-auto"
              onClick={onClickPostListing}
              buttonStyle={{ height: "fit-content" }}
            />
          </div>
          <ListingsList
            landlordDashboard={landlordDashboard}
            setLandlordDashboard={setLandlordDashboard}
            navigate={navigate}
            isMobile={isMobile}
          />
        </div>
        
      </div>
    </div>
    <FooterComp
    ignoreAbsolute={landlordDashboard?.currentListings?.length}
    {...props}
  />
  </>
  );
};

export default LandlordHome;
