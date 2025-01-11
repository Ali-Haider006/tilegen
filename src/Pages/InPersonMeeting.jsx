import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./InPersonMeeting.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InPersonMeeting = () => {
  const [selectedPosition, setSelectedPosition] = useState([51.505, -0.09]); // Default position
  const [meetingDate, setMeetingDate] = useState(new Date());  // Default date
  const [meetingTime, setMeetingTime] = useState(new Date());  // Default time
  const [isFormComplete, setIsFormComplete] = useState(false); // Tracks form completion

  const LocationMarker = () => {
    useMapEvents({
      click(event) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);  // Update position on map click
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition} />
    ) : null;
  };

  const handleDone = () => {
    const meetingDetails = {
      location: {
        latitude: selectedPosition[0],
        longitude: selectedPosition[1],
      },
      date: meetingDate.toLocaleDateString(),
      time: meetingTime.toLocaleTimeString(),
    };
    console.log("Meeting Details:", meetingDetails);
    alert("Meeting details saved successfully!");
    setIsFormComplete(true); // Mark the form as complete
  };

  return (
    <div>
      <h1>In-Person Meeting</h1>
      <p>Click on the map to select a location:</p>
      
      <MapContainer
        className="map-container"
        center={selectedPosition}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>

      <div className="selected-location-info">
        <h3>Selected Location:</h3>
        <p>Latitude: {selectedPosition[0]}</p>
        <p>Longitude: {selectedPosition[1]}</p>
      </div>

      <div className="meeting-info">
        <h3>Set Meeting Date and Time</h3>

        <div className="date-picker">
          <label htmlFor="meeting-date">Meeting Date:</label>
          <DatePicker
            selected={meetingDate}
            onChange={(date) => setMeetingDate(date)}  // Update date
            dateFormat="MMMM d, yyyy"
            id="meeting-date"
            className="date-time-picker"
          />
        </div>

        <div className="time-picker">
          <label htmlFor="meeting-time">Meeting Time:</label>
          <DatePicker
            selected={meetingTime}
            onChange={(time) => setMeetingTime(time)}  // Update time
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}  // Time interval in minutes
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            id="meeting-time"
            className="date-time-picker"
          />
        </div>
      </div>

      <button 
        className="done-button" 
        onClick={handleDone}
        disabled={isFormComplete} // Disable the button once done
      >
        {isFormComplete ? "Done!" : "Submit Details"}
      </button>
    </div>
  );
};

export default InPersonMeeting;
