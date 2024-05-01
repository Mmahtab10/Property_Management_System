import React from "react";
import Input from "./interactionComponents/Input";
import HomeFooterImage from "../assets/HomeFooterImage.png";

const HomeFooter = ({ isMobile }) => {
    return (
        <div className={`flex px-40 pt-9 mt-20 bg-black text-white flex-wrap absolute bottom-0 w-full items-center ${isMobile ? "text-center justify-center" : ""}`}>
            <div className={`flex flex-col`}>
                <div className={`text-2xl ${isMobile ? "" : 'w-72'}`} font-bold w-72 style={{ lineBreak: "strict" }}>
                    Find the home you deserve
                </div>
                <div className={`text-md ${isMobile ? "" : 'w-72'}`} py-6 w-72 style={{ lineBreak: "strict" }}>
                    Begin browsing now
                </div>
                {/* <div className="text-black">
                    <Input />
                </div> */}
                {isMobile && <div className={`w-60 ${isMobile ? 'pt-4' : 'ml-auto '}`}>
                    <img
                        src={HomeFooterImage}
                    />
                </div>}
            </div>
            {!isMobile && <div className={`w-60 ${isMobile ? 'pt-4' : 'ml-auto '}`}>
                <img
                    src={HomeFooterImage}
                />
            </div>}
        </div>
    )
};

export default HomeFooter;
