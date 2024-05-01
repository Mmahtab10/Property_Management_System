import React from "react";
import NavBar from "./NavBarComponent";
import Body from "./Body";
import HomeFooter from "./HomeFooter";


const Home = (props) => {
    const {navigate = () => {}, isMobile} = props;
    return (
        <div className="text-black text-lg">
            <div className="flex flex-col">
                <NavBar navigate={navigate} isMobile={isMobile} {...props}/>
                <Body navigate={navigate} isMobile={isMobile} {...props} />
                <HomeFooter navigate={navigate} isMobile={isMobile} {...props} />
            </div>
        </div>
    )
}

export default Home