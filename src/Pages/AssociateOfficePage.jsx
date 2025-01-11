  import React, { useState } from 'react';
  import Select from 'react-select';
  import Calendar from 'react-calendar';
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import "./AssociateOfficePage.css";

  const AssociateOfficePage = () => {
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [date, setDate] = useState(new Date());

    const offices = [
      { label: 'Office 1 - New York', value: 'ny' },
      { label: 'Office 2 - Los Angeles', value: 'la' },
      { label: 'Office 3 - Chicago', value: 'chicago' },
    ];

    const handleSelect = (selectedOption) => {
      setSelectedOffice(selectedOption);
    };

    const handleDateChange = (newDate) => {
      setDate(newDate);
    };

    return (
      <div className="container">
        <h1>Choose Your Associate Office</h1>

        {/* Office selection */}
        <div className="select-office">
          <Select
            options={offices}
            onChange={handleSelect}
            value={selectedOffice}
            placeholder="Search and select an office"
          />
          {selectedOffice && <p>You have selected: {selectedOffice.label}</p>}
        </div>

        {/* Map */}
        <h2>Office Locations on Map</h2>
        <div className="map-container">
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[51.505, -0.09]}>
              <Popup>Office Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Calendar */}
        <h2>Select Available Date</h2>
        <div className="calendar">
          <Calendar onChange={handleDateChange} value={date} />
        </div>

        {/* Ratings & Reviews */}
        <h2>Office Ratings and Reviews</h2>
        <div className="reviews">
          <div>
            <h3>Office 1</h3>
            <p>Rating: 4 / 5</p>
            <ul>
              <li>Great place!</li>
              <li>Helpful staff.</li>
            </ul>
          </div>
          <div>
            <h3>Office 2</h3>
            <p>Rating: 5 / 5</p>
            <ul>
              <li>Excellent service!</li>
            </ul>
          </div>
          <div>
            <h3>Office 3</h3>
            <p>Rating: 3 / 5</p>
            <ul>
              <li>Decent, but needs improvement.</li>
            </ul>
          </div>
        </div>

        {/* Image under reviews */}
        {/* <div className="image-container">
          <img src="path-to-your-image.jpg" alt="Office Image" />
        </div> */}
      </div>
    );
  };

  export default AssociateOfficePage;
