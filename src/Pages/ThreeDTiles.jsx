import React from 'react';
import { Link } from 'react-router-dom';
import './ThreeDtiles.css'; // Add appropriate styling
import sculptured from '../Components/Assets/sculpturedSquare.png'
import octopusHands from '../Components/Assets/OctopusHand.png'
import BlueFloral from '../Components/Assets/BlueFloral.png'
const products = [
  {
    id: 1,
    name: "Sculpted Square",
    old_price: 50.00,
    new_price: 35.00,
    category: "Wall Tile",
    tags: "Durable, Modern, Aesthetic",
    description: "This is a high-quality square ceramic tile, perfect for modern wall design.",
    image: sculptured, // Placeholder for .obj or image
    link: "/3D2"
  },
  {
    id: 2,
    name: "Sculpted Octopus Hand",
    old_price: 50.00,
    new_price: 35.00,
    category: "Wall Tile",
    tags: "Durable, Modern, Aesthetic",
    description: "This is a high-quality square ceramic tile, with sculpted tendon of octopus",
    image: octopusHands, // Placeholder for .obj or image
    link: "/3D3"
  },
  {
    id: 3,
    name: "Ceramic Blue Floral Tile",
    old_price: 60.00,
    new_price: 45.00,
    category: "Wall Tile",
    tags: "Durable, Modern, Aesthetic",
    description: "This is a high-quality blue floral square ceramic tile, perfect for modern wall design.",
    image: BlueFloral, // Placeholder for .obj or image
    link: "/3D4"
  }
];

const ThreeDtiles = () => {
  return (
    <div className="tile-catalogue">
      <h2>3D Tile Products</h2>
      <div className="tile-catalogue-container">
        {products.map((product) => (
          <div className="tile-card" key={product.id}>
            <Link to={product.link}>
              <img src={product.image} alt={product.name} className="tile-image" />
            </Link>
            <h3>{product.name}</h3>
            <p className="tile-description">{product.description}</p>
            <div className="tile-price">
              <span className="new-price">${product.new_price}</span>
              <span className="old-price">${product.old_price}</span>
            </div>
            <Link to={product.link} className="view-details-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDtiles;
