import React, { useState } from "react";
import "../styles/PhoneCallMeeting.css";

const PhoneCallMeeting = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [sendSMS, setSendSMS] = useState(false);

  const handleSubmit = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!preferredTime) {
      alert("Please select a preferred time.");
      return;
    }

    // Mock SMS Notification
    console.log(
      `Mock SMS: Meeting scheduled for ${preferredTime}. Reminder ${
        sendSMS ? "enabled" : "disabled"
      } for phone number ${phoneNumber}.`
    );
    alert(
      `Phone call meeting details saved!\n\nPhone Number: ${phoneNumber}\nPreferred Time: ${preferredTime}\nSMS Reminder: ${
        sendSMS ? "Enabled" : "Disabled"
      }`
    );

    // Clear inputs after submission
    setPhoneNumber("");
    setPreferredTime("");
    setSendSMS(false);
  };

  return (
    <div className="phone-call-meeting">
      <h1>Phone Call Meeting Setup</h1>
      <p>Provide your contact details and schedule a time for the call.</p>

      <div className="form-group">
        <label htmlFor="phone-number">Phone Number:</label>
        <input
          id="phone-number"
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="preferred-time">Preferred Time:</label>
        <input
          id="preferred-time"
          type="datetime-local"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={sendSMS}
            onChange={() => setSendSMS(!sendSMS)}
          />
          Send me an SMS reminder
        </label>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PhoneCallMeeting;
