import React, { useState } from "react";
import "./VideoConferenceMeeting.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VideoConferenceMeeting = () => {
  const [platform, setPlatform] = useState("");
  const [meetingDate, setMeetingDate] = useState(null);
  const [emailReminder, setEmailReminder] = useState(false);
  const [meetingSummary, setMeetingSummary] = useState("");

  const handleSubmit = () => {
    if (!platform || !meetingDate) {
      alert("Please fill out all fields.");
      return;
    }

    // Displaying meeting summary
    const summary = `
      Platform: ${platform}\n
      Date and Time: ${meetingDate.toLocaleString()}\n
      Email Reminder: ${emailReminder ? "Enabled" : "Disabled"}
    `;
    setMeetingSummary(summary);

    alert("Meeting details submitted successfully!");
  };

  return (
    <div className="video-conference-meeting">
      <h1>Video Conference Setup</h1>
      <p>Provide the platform details (e.g., Zoom, Teams) and meeting link.</p>

      <div className="form-group">
        <label htmlFor="platform">Choose Platform:</label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Select a Platform</option>
          <option value="Zoom">Zoom</option>
          <option value="Teams">Microsoft Teams</option>
          <option value="Google Meet">Google Meet</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="meeting-date">Select Meeting Date and Time:</label>
        <DatePicker
          id="meeting-date"
          selected={meetingDate}
          onChange={(date) => setMeetingDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={emailReminder}
            onChange={() => setEmailReminder(!emailReminder)}
          />
          Send me an email reminder
        </label>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      {meetingSummary && (
        <div className="meeting-summary">
          <h3>Meeting Summary:</h3>
          <pre>{meetingSummary}</pre>
        </div>
      )}
    </div>
  );
};

export default VideoConferenceMeeting;

