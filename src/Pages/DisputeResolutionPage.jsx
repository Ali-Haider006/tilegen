import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DisputeResolutionPage.css";

const DisputeResolutionPage = () => {
  const [formData, setFormData] = useState({
    mediator: "",
    qualifications: "",
    format: "",
    disputeType: "",
    priority: "",
    expectations: "",
    documents: null,
    vendorName: "",
    vendorContact: "",
    vendorEmail: "",
    additionalNotes: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate();

  // Handle change for text inputs, dropdowns, and textareas
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      documents: e.target.files[0],
    }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      agreeToTerms: e.target.checked,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if terms are agreed
    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }

    // Navigate based on mediation format
    switch (formData.format) {
      case "In-person":
        navigate("/InPersonMeeting");
        break;
      case "Online Video Conference":
        navigate("/VideoConferenceMeeting");
        break;
      // case "Phone Call":
      //   navigate("/phone-call-meeting");
      //   break;
      // case "Email":
      //   navigate("/email-meeting");
      //   break;
      default:
        alert("Please select a mediation format to proceed.");
    }
  };

  return (
    <div className="dispute-resolution-container">
      <h1>Dispute Resolution Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Mediator Details */}
        <div className="form-group">
          <label>Select Mediator:</label>
          <select
            name="mediator"
            value={formData.mediator}
            onChange={handleChange}
            required
          >
            <option value="">Select a Mediator</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Alex Johnson">Alex Johnson</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mediator Qualifications:</label>
          <select
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          >
            <option value="">Select Qualifications</option>
            <option value="Legal Expert">Legal Expert</option>
            <option value="Business Arbitrator">Business Arbitrator</option>
            <option value="Technical Specialist">Technical Specialist</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Mediation Format:</label>
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            required
          >
            <option value="">Select Format</option>
            <option value="In-person">In-person</option>
            <option value="Online Video Conference">
              Online Video Conference
            </option>
            <option value="Phone Call">Phone Call</option>
            <option value="Email">Email</option>
          </select>
        </div>

        {/* Dispute Details */}
        <div className="form-group">
          <label>Dispute Type:</label>
          <select
            name="disputeType"
            value={formData.disputeType}
            onChange={handleChange}
            required
          >
            <option value="">Select Dispute Type</option>
            <option value="Contractual">Contractual</option>
            <option value="Workplace">Workplace</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority Level:</label>
          <div>
            <label>
              <input
                type="radio"
                name="priority"
                value="High"
                checked={formData.priority === "High"}
                onChange={handleChange}
              />
              High (Instant Payment)
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="Medium"
                checked={formData.priority === "Medium"}
                onChange={handleChange}
              />
              Medium (200$)
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="Low"
                checked={formData.priority === "Low"}
                onChange={handleChange}
              />
              Low (0)
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Outcome Expectations:</label>
          <textarea
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
            placeholder="Enter your expectations here..."
            rows="4"
          ></textarea>
        </div>

        {/* Vendor Details */}
        <div className="form-group">
          <label>Vendor Name:</label>
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            placeholder="Enter the vendor's name"
          />
        </div>

        <div className="form-group">
          <label>Vendor Contact:</label>
          <input
            type="tel"
            name="vendorContact"
            value={formData.vendorContact}
            onChange={handleChange}
            placeholder="Enter the vendor's contact number"
          />
        </div>

        <div className="form-group">
          <label>Vendor Email:</label>
          <input
            type="email"
            name="vendorEmail"
            value={formData.vendorEmail}
            onChange={handleChange}
            placeholder="Enter the vendor's email"
          />
        </div>

        <div className="form-group">
          <label>Additional Notes:</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Add any other relevant information..."
            rows="4"
          ></textarea>
        </div>

        {/* Supporting Documents */}
        <div className="form-group">
          <label>Upload Supporting Documents:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        {/* Terms and Conditions */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
            />
            I agree to the terms and conditions.
          </label>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DisputeResolutionPage;
