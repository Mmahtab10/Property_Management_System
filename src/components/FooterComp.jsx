import React from 'react';
import FirstHomeLogo from "../assets/firstHomeLogo.svg";
import CopyRightImage from "../assets/copyright.svg";


const FooterComp = (props) => {
    const {isMobile, ignoreAbsolute, navigate, isBuyerLoggedIn, isLandlordLoggedIn,isAdminLoggedIn} = props;
    return (
        <div className={`${(isMobile || ignoreAbsolute) ? '' : 'absolute bottom-0'} px-4 w-full`}>
            <div className={`flex flex-row flex-wrap bg-white text-black justify-between items-center w-full`}>
                <div className={`font-bold border-r-2 border-black ${isMobile ? "items-center basis-1/2" :"p-3"} flex flex-col italic`} style={{ fontSize: `${isMobile ? '' : '1.5em'}` }}>
                    <img src={FirstHomeLogo} alt='First Home Logo' style={isMobile ? {height: "auto", width: "60%"} : {}} />
                    FirstHome
                </div>
                <div className={`flex flex-col ${isMobile ? 'basis-1/2 text-center' : {}}`}>
                    <div className=' font-bold underline' style={{ fontSize:  `${isMobile ? '' : '1.5em'}` }}>
                        Postings
                    </div>
                    <div onClick={()=>navigate("listings")} className="cursor-pointer">
                        Search for a Listing
                    </div>
                    {isLandlordLoggedIn && <div onClick={()=>navigate("landlordhome")} className="cursor-pointer">
                        Post a Listing
                    </div>}

                </div>
                <div className={`flex flex-col ${isMobile ? 'basis-1/2 text-center' : {}}`}>
                    <div className=' font-bold underline' style={{ fontSize:  `${isMobile ? '' : '1.5em'}` }}>
                        Learn More
                    </div>
                    <div onClick={()=>navigate("/aboutUs")} className="cursor-pointer">
                        About Us
                    </div>
                    <div onClick={()=>navigate("/contactus")} className="cursor-pointer">
                        Contact Us
                    </div>
                    <div onClick={()=>navigate("/contactus")} className="cursor-pointer">
                        FAQs
                    </div>
                </div>
                <div className={`flex flex-col ${isMobile ? 'basis-1/2 text-center' : {}}`}>
                    <div className=' font-bold underline' style={{ fontSize:  `${isMobile ? '' : '1.5em'}` }}>
                        Account
                    </div>
                    {(isLandlordLoggedIn || isBuyerLoggedIn || isAdminLoggedIn)?(
                    <div onClick={()=>navigate("/accountsettings")} className="cursor-pointer">
                        Manage your Account
                    </div>): 
                    <div onClick={()=>navigate("/signup")} className="cursor-pointer">
                        Signup
                    </div> }
                </div>
                <div className='flex flex-col basis-15-percent'>
                    <div className='' >
                        FirstHome Canada Office
                    </div>
                    <div className=''>
                        2500 University Drive NW Calgary, Alberta, T2N 1N4
                    </div>
                    <div className=''>
                        403-220-5110
                    </div>
                    <div className=' mt-auto flex flex-row gap-1'>
                        <img src={CopyRightImage} alt='Copyright' /> 2024 FirstHome Inc
                    </div>
                    <div className=''>
                        All rights reserved
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FooterComp