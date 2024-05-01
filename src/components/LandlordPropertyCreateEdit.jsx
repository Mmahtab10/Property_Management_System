import React, { useEffect, useState } from "react";
import NavBar from "./NavBarComponent";
import Button from "./interactionComponents/Button";
import Input from "./interactionComponents/Input";
import { FormSelect } from "react-bootstrap";
import HouseListingImage1 from "../assets/HouseListingImage1.png";
import HouseListingImage2 from "../assets/HouseListingImage2.png";
import HouseListingImage3 from "../assets/HouseListingImage3.png";
import HouseListingImage4 from "../assets/HouseListingImage4.png";
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
import FooterComp from "./FooterComp";
import { Carousel } from "react-bootstrap";

import {
  deleteSellerListing,
  postSellerListing,
  updateSellerListing,
  uploadSellerImage,
} from "../apiUtil";

const LandlordPropertyCreateEdit = (props) => {
  const { navigate, landlordDashboard, setLandlordDashboard, isMobile } = props;
  let { currentListing = {} } = landlordDashboard;
  const { propertyDescription } = currentListing;
  const [currentSlide, setCurrentSlide] = useState(-1);
  const status = currentListing?.status?.toLowerCase();
  // let currentListing = {
  //     "price": 432969,
  //     "address": "35478 E street, Airdrie, Alberta, 99625",
  //     "bed": 3,
  //     "bath": 3,
  //     "squareFootage": 3083,
  //     "status": "In Review"
  // };

  const isEditMode = currentListing.isEditMode;

  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  async function deletePosting() {
    if (
      window.confirm(
        "Are you sure you want to delete this posting? This action is irreversible."
      )
    ) {
      const response = await deleteSellerListing(currentListing.id);
      navigate("landlordHome");
    }
  }

  const [urls, setUrls] = useState([]);
  const [editPageUrls, setEditPageUrls] = useState([]);
  async function sendData() {
    const postingInfo = landlordDashboard.currentListing;

    const newPostingAttributes = {
      sellerID: postingInfo.idSeller || landlordDashboard.isSeller.id,
      searchType: postingInfo.type,
      propertyType: postingInfo.propertyType,
      price: postingInfo.price,
      address: postingInfo.address,
      bath: postingInfo.bath,
      bed: postingInfo.bed,
      squareFootage: postingInfo.squareFootage,
      propertyDescription: postingInfo.propertyDescription,
    };
    if (isEditMode) {
      const editFormattedURLs = editPageUrls.join(",");
      let reportStatus = postingInfo.status;
      if(postingInfo.status === "Taken Down")
      {
        reportStatus = "In Review"
      }
      if (postingInfo.type === "Rent") {
        const newPosting = {
          ...newPostingAttributes,
          leaseDuration: postingInfo.leaseDuration,
          utilities: postingInfo.utilities,
          dateAvailable: postingInfo.dateAvailable,
          images: editFormattedURLs,
          status: reportStatus,
          id: postingInfo.id,
        };
        const response = await updateSellerListing(newPosting);
      } else {
        const newPosting = {
          ...newPostingAttributes,
          images: editFormattedURLs,
          status: reportStatus,
          id: postingInfo.id,
        };
        const response = await updateSellerListing(newPosting);
      }
    } else {
      const formattedURLs = urls.join(",");
      if (postingInfo.type === "Rent") {
        const newPosting = {
          ...newPostingAttributes,
          leaseDuration: postingInfo.leaseDuration,
          utilities: postingInfo.utilities,
          dateAvailable: postingInfo.dateAvailable,
          images: formattedURLs,
        };
        const response = await postSellerListing(newPosting);
      } else {
        const newPosting = {
          ...newPostingAttributes,
          images: formattedURLs,
        };
        const response = await postSellerListing(newPosting);
      }
    }

    navigate("landlordHome");
  }

  const imageUpload = async (e) => {
    console.log(isEditMode);
    if (isEditMode) {
      const editImgForm = new FormData();
      const file = e.target.files[0];
      editImgForm.append("image", file);
      const returnURL = await uploadSellerImage(editImgForm);
      const urlArray = [...editPageUrls, returnURL.imageUrl];
      console.log(returnURL.imageUrl);
      setEditPageUrls(urlArray);
    } else {
      const imgForm = new FormData();
      const file = e.target.files[0];
      imgForm.append("image", file);
      const returnURL = await uploadSellerImage(imgForm);
      console.log(returnURL.imageUrl);
      setUrls((url) => [...url, returnURL.imageUrl]); //Image URL state store
      const input = document.getElementById("imageFile");
      input.value = null;
    }
  };

  const handleRemoveImage = async () => {
    if (isEditMode) {
      console.log("test");
      setEditPageUrls([]);
    } else {
      setUrls([]);
    }
  };

  useEffect(() => {
    !Object.keys(currentListing).length &&
      setLandlordDashboard("currentListing", {
        ...currentListing,
        type: "Sale",
        bed: "1",
        bath: "1",
        propertyType: "House",
        utilities: "No",
      });
    if (isEditMode) {
      const temp = currentListing.images.split(",");
      setEditPageUrls(temp);
      console.log(editPageUrls);
    }
  }, []);

  return (
    <div className="text-white text-lg bg-black">
      <div className="flex flex-col flex-wrap">
        <NavBar navigate={navigate} isMobile={isMobile} {...props} />
        <div className={`${isMobile ? "" : "m-20"}`}>
          <div className="flex flex-row flex-wrap m-4">
            <div
              className="mr-auto font-semibold"
              style={{ fontSize: `${isMobile ? "" : "3em"}` }}
            >
              {isEditMode ? "Edit Listing" : "Post Listing"}
            </div>
          </div>
          <div
            className="bg-light-grey rounded-md m-4 flex flex-col justify-between items-center p-3"
            style={{ fontSize: "20px" }}
          >
            <div
              className={`${
                isMobile ? "" : "self-start"
              } font-semibold underline `}
              style={{ fontSize: "28px" }}
            >
              Property
            </div>

            <div className="flex flex-row justify-center items-center flex-wrap">
              {isEditMode ? (
                <div>
                  <Carousel slide={false} interval={null} data-bs-theme="dark">
                    {editPageUrls.map((url, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={url}
                          alt="uploaded"
                          className="image"
                          style={{ width: "400px", height: "300px" }}
                        ></img>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div>
                  <Carousel slide={false} interval={null} data-bs-theme="dark">
                    {urls.map((url, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={url}
                          alt="uploaded"
                          className="image"
                          style={{ width: "400px", height: "300px" }}
                        ></img>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}
              <div
                className="flex flex-col ml-4"
                style={{ marginLeft: "5rem" }}
              >
                <label
                  htmlFor="imageFile"
                  className="ml-auto bg-cyan-600 cursor-pointer rounded-md p-2"
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={(e) => imageUpload(e)}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                  style={{ display: "none" }}
                />
                <label
                  className="ml-auto bg-cyan-600 cursor-pointer rounded-md p-2"
                  onClick={handleRemoveImage}
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Remove All Images
                </label>
              </div>
            </div>
            <div className="flex flex-col w-100">
              Status: {currentListing.status}
              {(status === "taken down"|| status === "in review") && (
                <div className="flex flex-col">
                  <label className="mt-0 mb-1">Reason</label>
                  <textarea
                    className="bg-white h-32 "
                    value={currentListing.reportReason || ""}
                    name="takeDownReason"
                    disabled
                  />
                </div>
              )}
            </div>
            {/* {'taken down' === 'taken down' && (
                            <div className="flex flex-col basis-full">
                                <label className="mt-0 mb-1">Property Description</label>
                                <textarea
                                    className="bg-white h-64 "
                                    onChange={(e) => setLandlordDashboard("propertyDescription", e.target.value)}
                                    value={"" || ""}
                                    name="propertyDescription"
                                />
                            </div>
                        )} */}

            <div className="flex flex-row flex-wrap  justify-between gap-3">
              <div className="">
                <label className="mt-0">Posting Type</label>
                <FormSelect
                  aria-label="Property Type"
                  className=""
                  value={currentListing.type}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </FormSelect>
              </div>
              <div>
                <Input
                  inputClass="rounded-none"
                  placeholder="$300000"
                  label="Property Cost"
                  value={currentListing.price || ""}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              {currentListing.type?.toLowerCase() === "rent" && (
                <div className={`flex flex-row basis-2/4  ${isMobile ? "flex-wrap" : ""} gap-4`}>
                  <Input
                    inputClass="rounded-none w-fit"
                    parentClass=""
                    placeholder="1 month"
                    label="Lease Duration (Months)"
                    value={currentListing.leaseDuration}
                    onChange={(e) =>
                      setLandlordDashboard("currentListing", {
                        ...currentListing,
                        leaseDuration: e.target.value,
                      })
                    }
                  />
                  <Input
                    inputClass="rounded-none w-fit"
                    placeholder="YYYY/MM/DD"
                    label="Date Available"
                    value={currentListing.dateAvailable || ""}
                    onChange={(e) =>
                      setLandlordDashboard("currentListing", {
                        ...currentListing,
                        dateAvailable: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              <div className="">
                <label className="mt-0">Property Type</label>
                <FormSelect
                  aria-label="Property Type"
                  className=""
                  value={currentListing.propertyType}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
                      propertyType: e.target.value,
                    })
                  }
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                </FormSelect>
              </div>
              <div className="flex flex-row basis-full">
                <Input
                  inputClass="rounded-none"
                  parentClass="basis-full"
                  placeholder=""
                  label="Address"
                  value={currentListing.address || ""}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="">
                <label className="mt-0"># of Bedrooms</label>
                <FormSelect
                  aria-label="Bedrooms"
                  className=""
                  value={currentListing.bed}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
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
              <div className="">
                <label className="mt-0"># of Bathrooms</label>
                <FormSelect
                  aria-label="Bathrooms"
                  className=""
                  value={currentListing.bath}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
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
              <div className="">
                <Input
                  inputClass="rounded-none"
                  placeholder=""
                  parentClass=""
                  label="Square Feet"
                  value={currentListing.squareFootage}
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
                      squareFootage: e.target.value,
                    })
                  }
                />
              </div>
              {currentListing.type?.toLowerCase() === "rent" && (
                <div className="">
                  <label className="mt-0">Utilities</label>
                  <FormSelect
                    aria-label="Utilities"
                    className=""
                    value={currentListing.utilities}
                    onChange={(e) =>
                      setLandlordDashboard("currentListing", {
                        ...currentListing,
                        utilities: e.target.value,
                      })
                    }
                  >
                    {" "}
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </FormSelect>
                </div>
              )}
              <div className="flex flex-col basis-full">
                <label className="mt-0 mb-1">Property Description</label>
                <textarea
                  className="bg-white h-64 "
                  onChange={(e) =>
                    setLandlordDashboard("currentListing", {
                      ...currentListing,
                      propertyDescription: e.target.value,
                    })
                  }
                  value={propertyDescription || ""}
                  name="propertyDescription"
                  placeholder="Property Description"
                />
              </div>
              <div className="flex flex-row mt-4 basis-full">
                <Button
                  title={isEditMode ? "Save" : "Post"}
                  buttonClass="ml-auto bg-cyan-600 rounded-none p-2.5"
                  onClick={() => sendData()}
                />
                <Button
                  title={"Cancel"}
                  onClick={() => {
                    localStorage.removeItem("House");
                    setLandlordDashboard("currentListing", {});
                    navigate("landlordHome");
                  }}
                  buttonClass="ml-auto bg-cyan-600 rounded-none p-2.5"
                />
                {isEditMode && (
                  <Button
                    title={"Delete Posting"}
                    buttonClass="ml-auto bg-cyan-600 rounded-none p-2.5"
                    onClick={() => {
                      deletePosting();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <FooterComp ignoreAbsolute isMobile={isMobile} />
      </div>
    </div>
  );
};

export default LandlordPropertyCreateEdit;
