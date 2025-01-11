import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import start_icon from "../Assets/star_icon.png";
import start_dull_icon from "../Assets/star_dull_icon.png";
import { useLinkClickHandler } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState("S"); // State for selected size
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State for selected quantity

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };
 const {theme}=useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-image">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1 className={`ph1_${theme}`}>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_dull_icon} alt="" />
          <p className={`ph1_${theme}`}>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className={`productdisplay-right-description pdiv_${theme}`}>
        

"These premium tiles offer a perfect blend of durability and design, providing a stylish solution for both indoor and outdoor spaces. Crafted with precision, they are resistant to wear, moisture, and stains, making them ideal for high-traffic areas. Available in a variety of textures, patterns, and colors, 
these tiles are designed to complement any aesthetic, from modern to classic, ensuring a timeless finish for your home or business."
        </div>
        <div className="productdisplay-right-size">
          <h1 className={`ph1_${theme}`}>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div
              className={`size-option ${
                selectedSize === "24" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("24")}
            >
              24*48
            </div>
            <div
              className={`size-option ${
                selectedSize === "32*48" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("32*48")}
            >
              32*48
            </div>
            <div
              className={`size-option ${
                selectedSize === "9*17" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("9*17")}
            >
              9*17
            </div>
            <div
              className={`size-option ${
                selectedSize === "12*26" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("12*26")}
            >
              12*26
            </div>
            <div
              className={`size-option ${
                selectedSize === "10*27" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("10*24")}
            >
              10*24
            </div>
          </div>
        </div>
        <div className="productdisplay-right-quantity">
          <h1 className={`ph1_${theme}`}>Select Quantity</h1>
          <input
            type="number"
            min="1"
            value={selectedQuantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            addToCart(product.id, selectedSize, selectedQuantity)
            toast.success("Item added to cart",{
              autoClose:1500,
              closeButton: false
            })
          }}
        > 
          ADD TO CART
        </button>
        <button
          onClick={() => {
            addToCart(product.id, selectedSize, selectedQuantity)
            toast.success("You can view this sample at ABC Centre Islamabad",{
              autoClose:1500,
              closeButton: false
            })
          }}
        > 
          Inspect Sample
        </button>
        <ToastContainer toastStyle={{fontWeight:"bold",marginTop:"68px"}}/>
        <p className={"productdisplay-right-category pdiv_"+theme}>
          <span>Category : </span>Tiles
        </p>
        <p className={"productdisplay-right-category pdiv_"+theme}>
          <span>Tags : </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
