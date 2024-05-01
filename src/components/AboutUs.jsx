import React from "react";
import NavBar from "./NavBarComponent";
import AboutUsImage from "../assets/AboutUsImage.png";
import FooterComp from "./FooterComp";


const AboutUs = (props) => {
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
    return (
        <div className="text-black bg-white flex flex-col flex-wrap justify-center">
            <div className="">
                <NavBar navigate={navigate} isMobile={isMobile} {...props} />
            </div>
            <div className="flex flex-col items-center justify-center p-4">
                <div className="" style={{ fontSize: "1.5rem" }}>
                    Our mission
                </div>
                <div className="font-bold" style={{ fontSize: "2rem" }}>
                    Making the process as simple as that
                </div>
                <p className={`${isMobile ? "" : "px-60 py-4"}`}>  
                    With the abysmal housing market that has persisted over the previous years in Canada, there is a great market present in matching clients/customers with appropriate housing that fits their needs. Our mission is to make the selling and purchasing of property as simple and clean as possible, while being accessible and flexible for the needs of various people. For this very reason, we have created FirstHome, an application meant to provide up-to-date accurate information on listings and create an easier environment to find and rent, sell, or post listings.
                </p>
                <div className={`${isMobile ? "" : 'ml-36'} flex flex-row flex-wrap  text-white  relative z-0 mb-5`}>
                    <div className=" bg-black basis-50-percent p-10">
                        <div className="">
                            Why FirstHome?
                        </div>
                        <p className="py-10 basis-50-percent">
                            We pride ourselves on providing a seamless real estate journey for our users. Our commitment to Accuracy ensures that you receive reliable information, meticulously monitored by our dedicated admins. Efficiency is at the core of our streamlined processes, making selling, buying, or renting a property a breeze. Count on us for a Reliable and trustworthy moderation, ensuring a smooth and trustworthy real estate experience every step of the way.
                        </p>
                    </div>
                    <img src={AboutUsImage} alt="About Us Image"  />
                </div>
            </div>
            <FooterComp ignoreAbsolute {...props} />
        </div>
    )
};

export default AboutUs