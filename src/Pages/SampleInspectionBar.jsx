import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SampleInspectionBar.css"; // Assuming CSS is linked

const SingleSampleOrderPage = () => {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Tile images (URLs or public paths)
  const tileImages = [
    "/product1.jpg", "/product2.jpg", "/product3.jpg", "/product4.jpg", "/product5.jpg",
    "/product6.jpg", "/product7.jpg", "/product8.jpg", "/product9.jpg", "/product10.jpg",
    "/product11.jpg", "/product12.jpg", "/product13.jpg", "/product14.jpg", "/product15.jpg",
    "/product16.jpg", "/product17.jpg"
  ];

  const handleTileSelection = (tile) => {
    setSelectedTiles((prev) => {
      if (prev.includes(tile)) {
        return prev.filter((t) => t !== tile); // Deselect
      }
      return [...prev, tile]; // Select
    });
  };

  const handleSubmit = () => {
    if (selectedTiles.length === 0) {
      alert("Please select at least one tile.");
      return;
    }
    alert(`You have selected tiles: ${selectedTiles.join(", ")}`);
    navigate("/AssociateOfficePage"); // Navigate to the next page
  };

  // Filter tiles based on search query
  const filteredTiles = tileImages.filter((tile) =>
    tile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sample-order-container">
      <h1>Select Sample Tiles</h1>

      {/* Search bar for filtering tiles */}
      <input
        type="text"
        placeholder="Search for a tile..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="tile-gallery">
        {filteredTiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${selectedTiles.includes(tile) ? "selected" : ""}`}
            onClick={() => handleTileSelection(tile)}
          >
            <img src={tile} alt={`Tile ${index + 1}`} />
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SingleSampleOrderPage;
