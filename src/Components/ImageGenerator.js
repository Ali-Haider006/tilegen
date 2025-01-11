import React, { useState } from "react";
import axios from "axios";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState(""); // For user input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [imagePath, setImagePath] = useState(""); // Generated image path

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setImagePath("");
    if (!prompt.trim()) {
      setError("Prompt is required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/generate-image", {
        prompt: prompt,
      });

      if (response.status === 200) {
        setImagePath(response.data.filePath);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>AI Image Generator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label htmlFor="prompt" style={{ display: "block", marginBottom: "8px" }}>
            Enter a prompt:
          </label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imagePath && (
    <div>
        <h3>Generated Image:</h3>
        <img
            src={`http://localhost:5000/uploads/${imagePath}`}
            alt="Generated"
            style={{
                maxWidth: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "10px",
            }}
        />
    </div>
)}
    </div>
  );
};


