const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();
const FormData = require("form-data");
const axios = require("axios");

// Create the payload for the API request
const payload = {
  prompt: "A ceramic tile having fabinacci patterns, color green, ",
  output_format: "jpeg", // Desired output format
};

// Function to generate image using Stability AI API
const generateImage = async () => {
  try {
    // Prepare FormData
    const form = new FormData();
    Object.keys(payload).forEach((key) => form.append(key, payload[key]));

    // Send POST request to Stability AI API
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*", // Request image format
          ...form.getHeaders(), // Include FormData headers
        },
        responseType: "arraybuffer", // Expect image as binary data
      }
    );

    // Check if response is successful
    if (response.status === 200) {
      // Save the image to a file
      fs.writeFileSync(`./fabinaaci.jpeg`, Buffer.from(response.data));
      console.log("Image saved as fibinacci.jpeg");
    } else {
      throw new Error(`Error: ${response.status} - ${response.data.toString()}`);
    }
  } catch (error) {
    // Handle errors during the API call
    console.error("Error generating image:", error.message);
  }
};

// Call the function to generate the image
generateImage();
