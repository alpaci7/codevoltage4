import { useEffect, useState } from "react";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import youtube from "../images/youtube.png";

import "../styles/SocialNetwork.css";
const SocialNetwork = () => {
const [clicked, setClicked] = useState(false);

    const handleClick = ()=>{

        setClicked(!clicked);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setClicked(true);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <div className="side-bar">
            <div className={clicked ? "side-bar-social" : "side-bar-social-active"}>
                <div className="social-container" onClick={()=>window.open("https://www.facebook.com")}><img className="facebook" src={facebook} alt="Facebook"></img><div className="span">Facebook</div></div>
                <div className="social-container" onClick={()=>window.open("https://www.instagram.com")}><img className="instagram" src={instagram} alt="Instagram"></img><div className="span">Instagram</div></div>
                <div className="social-container" onClick={()=>window.open("https://www.youtube.com")}><img className="youtube" src={youtube} alt="Youtube"></img><div className="span">Youtube</div></div>     
            </div>
            <div className={clicked ? "social-arrow-active" : "social-arrow"} onClick={handleClick}>
                <i id="angle" className={clicked ? "fa-solid fa-angle-right" : "fa-solid fa-angle-left" }></i>
            </div>
        </div>
    );
}
 
export default SocialNetwork;