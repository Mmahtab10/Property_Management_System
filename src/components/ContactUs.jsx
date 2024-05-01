import React from "react";
import NavBar from "./NavBarComponent";
import Phone from "../assets/phone.svg";
import Email from "../assets/email.svg";
import FooterComp from "./FooterComp";


const ContactUs = (props) => {
    const { navigate, isMobile } = props;
    return (
        <div className="text-black bg-white flex flex-col flex-wrap justify-center">
            <div className="">
                <NavBar navigate={navigate} isMobile={isMobile} {...props} />
            </div>
            <div className="flex flex-col p-4">
                <div className="flex flex-col items-center justify-center  flex-wrap">
                    <div className="font-bold" style={{ fontSize: "2rem" }}>
                        Get in Touch
                    </div>
                    <p className="" style={{ fontSize: "1.5rem" }}>
                        Have any questions, concerns, or issues you would like to talk about? Here’s how you can reach us
                    </p>
                </div>
                <div className="flex flex-row flex-wrap justify-around p-5">
                    <div className="flex flex-col items-center text-center border-black border-2 ">
                        <img src={Phone} alt="Phone" style={{ width: "20%" }} />
                        <p className="w-3/4">
                            Talk to customer support. Just pick up the phone and call here
                        </p>
                        <p className="p-5" style={{ fontSize: "2.5rem" }}>
                            403-220-5110
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center border-black border-2 ">
                        <img src={Email} alt="Email" style={{ width: "20%" }} />
                        <p className="w-3/4">
                            Email customer support
                        </p>
                        <p className="p-5" style={{ fontSize: "2.5rem" }}>
                            firsthome@gmail.com
                        </p>
                    </div>

                </div>
                <div>
                    <div className="bg-black text-white flex flex-col p-5 gap-2">
                        <p className="font-bold" style={{ fontSize: "2rem" }}>
                            Frequently Asked Questions
                        </p>
                        <div className="flex flex-col font-semibold">
                            <p className="">
                                Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate quis elit eu tempor?
                            </p>
                            <p className="flex flex-row gap-2">
                                A: <p className=" font-normal">Sed metus tellus, dictum at cursus non, iaculis nec risus. Aliquam pulvinar eu arcu eu mollis</p>
                            </p>
                        </div>
                        <div className="flex flex-col font-semibold">
                            <p className="">
                                Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate quis elit eu tempor?
                            </p>
                            <p className="flex flex-row gap-2">
                                A: <p className=" font-normal">Sed metus tellus, dictum at cursus non, iaculis nec risus. Aliquam pulvinar eu arcu eu mollis</p>
                            </p>
                        </div>
                        <div className="flex flex-col font-semibold">
                            <p className="">
                                Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate quis elit eu tempor?
                            </p>
                            <p className="flex flex-row gap-2">
                                A: <p className=" font-normal">Sed metus tellus, dictum at cursus non, iaculis nec risus. Aliquam pulvinar eu arcu eu mollis</p>
                            </p>
                        </div>
                    </div>
                </div>
                <FooterComp ignoreAbsolute {...props}/>
            </div>
        </div>
    )
};

export default ContactUs