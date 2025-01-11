const fs = require("fs");
const fetch = require("node-fetch");
require('dotenv').config();  // Load environment variables from .env

// API endpoint for Stable Diffusion XL
const path = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
// const path =  `https://api.stability.ai/v2beta/stable-image/generate/sd3`;

// Set up headers for the request
const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    "Content-Type": "application/json",
};

// Set up the body with text prompts and configuration
const body = {
    steps: 40,  // Number of steps for image generation
    width: 1024,  // Image width
    height: 1024,  // Image height
    seed: 0,  // Random seed for reproducibility
    cfg_scale: 5,  // Control the influence of prompt
    samples: 1,  // Number of images to generate
    text_prompts: [
        {
            text: "A  green ceramic tile with circular patterns ",
            weight: 1,  // Positive weight for this prompt
        },
        {
            text: "blurry, bad",
            weight: -1,  // Negative weight to influence the image
        },
    ],
};

// Function to generate image and save the response
const generateImage = async () => {
    try {
        // Send POST request to Stability AI API
        const response = await fetch(path, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        // Parse the JSON response
        const responseJSON = await response.json();

        // Check if artifacts are available
        if (!responseJSON.artifacts || responseJSON.artifacts.length === 0) {
            throw new Error('No artifacts found in the response');
        }

        // Save images to the file system
        responseJSON.artifacts.forEach((image, index) => {
            const fileName = `txt2img_${image.seed}.png`;
            fs.writeFileSync(fileName, Buffer.from(image.base64, 'base64'));
            console.log(`Image saved as ${fileName}`);
        });

    } catch (error) {
        console.error("Error generating image:", error.message);
    }
};

// Call the function to generate and save the image
generateImage();
