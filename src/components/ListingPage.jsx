import { React, useEffect, useState } from "react";
import NavBar from "./NavBarComponent";
import Input from "./interactionComponents/Input";
import Button from "./interactionComponents/Button";
import { Card, Form, FormSelect, InputGroup } from "react-bootstrap";
import ListingHouseImage from "../assets/ListingHouseImage.png";
import BedImage from "../assets/BedImage.png";
import BathImage from "../assets/BathImage.png";
import SqFeetImage from "../assets/SqFeetImage.png";
import _ from "lodash";
import FooterComp from "./FooterComp";
import {
  getAllListings,
  getAllReportedListings,
  searchListing,
} from "../apiUtil";

const ListingPage = (props) => {
  const {
    navigate,
    setDashboardData,
    dashboard = {},
    metadata,
    setMetaData,
    isMobile,
  } = props;

  const [buttonClicked, setButtonClicked] = useState({
    filter: false,
    type: "Sale",
  });
  // const [listings, setListings] = useState(Array(30).fill(0));
  const listings = dashboard?.listings || [];

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

  const buttonChange = (type) => {
    if (type === "filter")
      setButtonClicked({ ...buttonClicked, filter: !buttonClicked.filter });
    else
      setButtonClicked((prevState) => {
        return { ...prevState, type };
      });
  };

  const handlePropertyClick = (e, index) => {
    navigate("propertyScreen");
    e.stopPropagation();
    setDashboardData("currentListing", listings[index]);
  };

  const handleFilterClick = async (e) => {
    e.stopPropagation();
    const listing = await searchListing({
      ...dashboard?.filterObject,
      searchTerm: dashboard?.search || "",
    });
    // setListings(listing || []);
    setDashboardData("listings", listing);
  };

  useEffect(() => {
    // Uncomment API
    // getAllListings(buttonClicked.type).then(response => setListings(response));
    setDashboardData("filterObject", {
      propertyType: "House",
      searchType: buttonClicked.type,
      minPrice: 0,
      maxPrice: 100000,
      minFootage: 0,
      maxFootage: 2000,
      bath: 1,
      bed: 2,
    });
  }, []);

  useEffect(() => {
    getAllListings(buttonClicked.type).then((response) =>{
      setDashboardData("listings", response);
    });
  }, [buttonClicked.type]);

  useEffect(() => {
    if(dashboard?.search) {
      const filteredListings = dashboard?.listings?.filter(listing => listing?.address?.toLowerCase()?.includes(dashboard?.search));
      setDashboardData("filteredListings",filteredListings);
    } else {
      setDashboardData("filteredListings",dashboard?.listings);
    }
  },[dashboard?.search]);

  useEffect(() => {
    if(dashboard?.listings)
      setDashboardData('filteredListings',dashboard?.listings)
  },[dashboard?.listings])

  return (
    <div className="text-white">
      <div className="bg-black">
        <NavBar navigate={navigate} isMobile={isMobile} {...props} />
      </div>
      <div className="p-14 flex flex-row flex-wrap listing-bg-image items-center listing-vertical-height">
        <div className={`flex ${isMobile ? "basis-full mb-2" : "basis-3/5"} `}>
          <Input
            inputClass="h-fit"
            parentClass="w-full"
            onChange={(e) => setDashboardData("search", e.target.value)}
            value={dashboard.search}
          />
        </div>
        <div className="flex flex-wrap flex-grow">
          <Button
            title={"Filter"}
            onClick={() => buttonChange("filter")}
            buttonClass={`p-2 ml-auto  text-black ${
              buttonClicked.filter ? "bg-gray-400" : "bg-white"
            }`}
          />
          <Button
            title={"For Sale"}
            onClick={() => buttonChange("Sale")}
            buttonClass={`p-2 ml-auto  text-black ${
              buttonClicked.type === "Sale" ? "bg-gray-400" : "bg-white"
            }`}
          />
          <Button
            title={"For Rent"}
            onClick={() => buttonChange("Rent")}
            buttonClass={`p-2 ml-auto  text-black ${
              buttonClicked.type === "Rent" ? "bg-gray-400" : "bg-white"
            }`}
          />
        </div>
        <br />
        {buttonClicked.filter && (
          <Form className="flex flex-row items-center justify-evenly gap-6 flex-wrap grow bg-slate-200 text-black font-bold mt-2 p-3">
            <div className="text-center">
              Property Type
              <FormSelect
                aria-label="Property Type"
                className="rounded-pill"
                value={dashboard?.filterObject?.propertyType}
                onChange={(e) =>
                  setDashboardData("filterObject", {
                    ...dashboard?.filterObject,
                    propertyType: e.target.value,
                  })
                }
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
              </FormSelect>
            </div>
            <div className=" text-center">
              Price Range
              <InputGroup size="sm">
                <Form.Control
                  aria-label="Small"
                  placeholder="$0"
                  aria-describedby="inputGroup-sizing-sm"
                  className="rounded-pill"
                  value={dashboard?.filterObject?.minPrice}
                  onChange={(e) =>
                    setDashboardData("filterObject", {
                      ...dashboard?.filterObject,
                      minPrice: e.target.value,
                    })
                  }
                />
                <div className="px-3">-</div>
                <Form.Control
                  aria-label="Small"
                  placeholder="$100000"
                  aria-describedby="inputGroup-sizing-sm"
                  className="rounded-pill"
                  value={dashboard?.filterObject?.maxPrice}
                  onChange={(e) =>
                    setDashboardData("filterObject", {
                      ...dashboard?.filterObject,
                      maxPrice: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </div>
            <div className=" text-center">
              Square Feet
              <InputGroup size="sm" className="">
                <Form.Control
                  aria-label="Small"
                  placeholder="0"
                  aria-describedby="inputGroup-sizing-sm"
                  className="rounded-pill"
                  value={dashboard?.filterObject?.minFootage}
                  onChange={(e) =>
                    setDashboardData("filterObject", {
                      ...dashboard?.filterObject,
                      minFootage: e.target.value,
                    })
                  }
                />
                <div className="px-3">-</div>
                <Form.Control
                  aria-label="Small"
                  placeholder="1000"
                  aria-describedby="inputGroup-sizing-sm"
                  className="rounded-pill"
                  value={dashboard?.filterObject?.maxFootage}
                  onChange={(e) =>
                    setDashboardData("filterObject", {
                      ...dashboard?.filterObject,
                      maxFootage: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </div>
            <div className="text-center">
              Beds
              <FormSelect
                aria-label="Property Type"
                className="rounded-pill"
                value={dashboard?.filterObject?.bed}
                onChange={(e) =>
                  setDashboardData("filterObject", {
                    ...dashboard?.filterObject,
                    bed: e.target.value,
                  })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </FormSelect>
            </div>
            <div className="text-center">
              Baths
              <FormSelect
                aria-label="Property Type"
                className="rounded-pill"
                value={dashboard?.filterObject?.bath}
                onChange={(e) =>
                  setDashboardData("filterObject", {
                    ...dashboard?.filterObject,
                    bath: e.target.value,
                  })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </FormSelect>
            </div>
            <div className="flex gap-2">
              <Button
                title={"Apply"}
                buttonClass="border-2 border-black mt-4 p-2"
                onClick={handleFilterClick}
              />
              <Button
                title={"Reset Filter"}
                buttonClass="border-2 border-black mt-4 p-2"
                onClick={() =>
                  getAllListings(buttonClicked.type).then((response) =>
                    setDashboardData("listings", response)
                  )
                }
              />
            </div>
          </Form>
        )}
      </div>
      <div
        className=" flex gap-6 flex-wrap p-3 bg-black justify-center"
        style={{ minHeight: "40vh" }}
      >
        {dashboard?.filteredListings?.map((listing, i) => {
          return (
            <Card
              onClick={(e) => handlePropertyClick(e, i)}
              className=" cursor-pointer basis-25-percent"
            >
              <Card.Body>
                {/* <Card.Title>Card Title</Card.Title> */}
                {console.log(listing.images.split(",")[0])}
                <Card.Img
                  className="w-100 h-64"
                  src={listing.images.split(",")[0]}
                />
                <Card.Text className="text-lg flex-col text-4xl">
                  $ {listing.price}
                </Card.Text>
                <Card.Text className="text-lg flex-col">
                  {listing.address}
                </Card.Text>
                <Card.Text className="text-lg border-y-2 border-black flex flex-row justify-between">
                  <Card.Text className="text-lg text-center border-l-2 border-black grow">
                    Bed
                    <Card.Text className="flex flex-row justify-around items-center p-4">
                      <Card.Img src={BedImage} style={{ width: "30%" }} />
                      {listing.bed}
                    </Card.Text>
                  </Card.Text>
                  <Card.Text className="text-lg text-center border-l-2 border-black grow flex flex-col justify-center">
                    Bath
                    <Card.Text className="flex flex-row justify-around items-center p-4">
                      <Card.Img src={BathImage} style={{ width: "30%" }} />
                      {listing.bath}
                    </Card.Text>
                  </Card.Text>
                  <Card.Text className="text-lg text-center border-x-2 border-black flex flex-col justify-center">
                    Square Feet
                    <Card.Text className="flex flex-row justify-around items-center p-4">
                      <Card.Img src={SqFeetImage} style={{ width: "30%" }} />
                      {listing.squareFootage}
                    </Card.Text>
                  </Card.Text>
                </Card.Text>
                {/* <ButtonBS variant="secondary">Go somewhere</ButtonBS> */}
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <FooterComp ignoreAbsolute {...props}/>
    </div>
  );
};

// const mapDispatchToProps = dispatch => (
//     bindActionCreators({
//         setDashboardData
//     },dispatch)
// )

// const mapStateToProps = state => {
//     const { dashboard } = state;
//     console.log('Dashboard state in mapStateToProps:', dashboard);
//     return { dashboard };
// }

export default ListingPage;
