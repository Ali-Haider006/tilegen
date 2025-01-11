/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HexaTileProduct.css';

// Hardcoded Product Information
const product = {
  id: 1,
  name: "Sculpted Octopus Hand",
  old_price: 50.00,
  new_price: 35.00,
  category: "Wall Tile",
  tags: "Durable, Modern, Aesthetic",
  description: "This is a high-quality square ceramic tile, with sculpted tendon of octopus",
  objFilePath: './eleph.obj', // Path to .obj file
};



const CeramicTileProduct = () => {
  const [selectedSize, setSelectedSize] = useState("12x12");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  return (
    <div className="product-container">
      {/* Left Side - 3D Model */}
      <div className="productdisplay-left">
      <div class="sketchfab-embed-wrapper">
      <iframe style={{position:'absolute',height:'100%',width:'50%',border:'none'}}title="Shibori part 9 of 16 tiles" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/eff8a01d64854bccbafe6d2689923826/embed"></iframe>
    </div>
      </div>
      

      {/* Right Side - Product Information */}
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-sizes">
            <div
              className={`size-option ${
                selectedSize === "12x12" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("12x12")}
            >
              12x12
            </div>
            <div
              className={`size-option ${
                selectedSize === "24x24" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("24x24")}
            >
              24x24
            </div>
            <div
              className={`size-option ${
                selectedSize === "36x36" ? "selected" : ""
              }`}
              onClick={() => handleSizeChange("36x36")}
            >
              36x36
            </div>
          </div>
        </div>
        <div className="productdisplay-right-quantity">
          <h2>Select Quantity</h2>
          <input
            type="number"
            min="1"
            value={selectedQuantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            toast.success("Item added to cart", {
              autoClose: 1500,
              closeButton: false,
            });
          }}
        >
          ADD TO CART
        </button>
        <ToastContainer toastStyle={{ fontWeight: "bold", marginTop: "68px" }} />
        <p className="productdisplay-right-category">
          <span>Category : </span>{product.category}
        </p>
        <p className="productdisplay-right-tags">
          <span>Tags : </span>{product.tags}
        </p>
      </div>
    </div>
  );
};

export default CeramicTileProduct;
