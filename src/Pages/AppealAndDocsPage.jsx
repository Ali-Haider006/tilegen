import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AppealAndDocsPage.css'; // If stored in a "Styles" folder



const AppealAndDocsPage = () => {
  const [formData, setFormData] = useState({
    date: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vendorName: "",
    appeal: "",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
    navigate("/DisputeResolutionPage");
  };

  return (
    <div className="page-container">
      <h1>Dispute Resolution: Appeal & Document Upload</h1>
      <div className="image-section">
        <img src="./upload-icon.png" alt="Upload" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Vendor Name:</label>
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            placeholder="Enter the vendor's name"
            required
          />
        </div>
        <div className="form-group">
          <label>Make an Appeal:</label>
          <textarea
            name="appeal"
            value={formData.appeal}
            onChange={handleChange}
            placeholder="Enter your appeal here..."
            rows="5"
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Documents:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppealAndDocsPage;
