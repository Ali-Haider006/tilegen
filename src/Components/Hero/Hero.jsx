import React, { useContext } from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/newlogo.jpg";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { theme } = useContext(ShopContext);
  return (
    <div className={"hero_" + theme}>
      <div className="hero-left">
        <h2 className={"h2h_" + theme}>WELCOME TO TILE-GEN</h2>
        <div>
          <div className="hero-hand-icon">
            <p className={"ph_" + theme}>The</p>
            
          </div>
          <p className={"ph_" + theme}>Best Tiles</p>
          <p className={"ph_" + theme}>Of Your Choice</p>
          <p className={"ph_" + theme}>"Experience The Luxury"</p>
        </div>
        
        
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
