const fs = require("fs");
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cloudinary = require('cloudinary').v2; // Cloudinary library
const { v4: uuidv4 } = require('uuid'); // For generating random ids
const stripe = require('stripe')('sk_test_51Q13gSASMqxlnj7IVCBtZS6ThX1n9jUTsQ3yiA4SAfnj0sdoEk2zPR95eKPLkoCj62WjgO8fx0GIudgpsQ37FLHB00dgY8kIc3');
const { createCanvas, loadImage } = require('canvas');
const THREE = require('three');
const STLExporter = require('./exporters/STLExporter');

// Initialize the app
const app = express();

// Middleware to handle JSON bodies
app.use(express.json());
app.use(cors());

// Configure Multer for file uploads (optional, can be removed if not needed)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary storage (optional)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
/////////////////////////////////

// Cloudinary configuration (replace with your credentials)
cloudinary.config({
  cloud_name: 'drtos63vy',
  api_key: '844739121123413',
  api_secret: 'oYo1I4tHXMoLwu2IqX5-i-z9IZU'
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerce006', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

// Mongoose Product Schema for Tile Products
const productSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Randomly generated id
  name: { type: String, required: true }, 
  category: { type: String, required: true }, 
  imageUrl: { type: String, required: true }, // Cloudinary image URL
  new_price: { type: Number, required: true }, 
  old_price: { type: Number, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

// Route to handle product submission
app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, category, new_price, old_price, size, quantity } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path); // Replace with your upload method if needed
    const imageUrl = result.secure_url; // Extract the image URL

    const newProduct = new Product({
      id: uuidv4(), // Generate random UUID for the product id
      name,
      category,
      imageUrl, // Use the Cloudinary image URL
      new_price,
      old_price,
      size,
      quantity,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Tile product added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Route to fetch products (including image URLs)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Serve static images from uploads folder (optional, if using temporary storage)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount:   
 amount * 100, // Convert amount to cents
      currency: 'usd', // Replace with your desired currency
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({   
 error: 'Failed to create payment intent'   
 });
  }
});


const orderSchema = new mongoose.Schema({
  stripeId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);


app.post('/create-payment', async (req, res) => {
  const { amount, currency, description } = req.body;

  try {
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method_types: ['card']
    });

    // Create a new order and save it to the database
    const order = new Order({
      stripeId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      description: paymentIntent.description,
      status: paymentIntent.status
    });

    await order.save();

    res.status(200).json({
      success: true,
      orderId: order._id,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: error.message });
  }
});
///////////////////////////////////////////////////////////////////////
// Function to generate image using Stability AI API
const generateImage = async (prompt) => {
  try {
    const payload = {
      prompt: prompt,  // Dynamic prompt from the request
      output_format: "jpeg", // Desired output format
    };

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
          // ...form.getHeaders(), // Include FormData headers
        },
        responseType: "arraybuffer", // Expect image as binary data
      }
    );

    // Check if response is successful
    if (response.status === 200) {
      // Save the image with dynamic file name
      const filePath = `./image.jpeg`;
      fs.writeFileSync(filePath, Buffer.from(response.data));
      console.log(`Image saved as ${filePath}`);
      return filePath;  // Return the file path to the caller
    } else {
      throw new Error(`Error: ${response.status} - ${response.data.toString()}`);
    }
  } catch (error) {
    // Handle errors during the API call
    console.error("Error generating image:", error.message);
    throw error;  // Re-throw the error
  }
};

// Route to generate an image with dynamic prompt and image name
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  // Check if prompt and imageName are provided
  if (!prompt) {
    return res.status(400).json({ error: "Prompt and image name are required" });
  }

  try {
    const filePath = await generateImage(prompt);  // Call the function to generate the image
    res.status(200).json({ message: "Image generated successfully", filePath: filePath });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate image", details: error.message });
  }
});
//////////////////////////////////////////////////////////////////////


// Function to load image and convert it to heightmap
const createHeightmapFromImage = async (imagePath) => {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  // Convert image to grayscale (heightmap)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const heightMap = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Average the RGB to get a grayscale value
    const gray = (r + g + b) / 3;
    heightMap.push(gray);
  }
  return { width: image.width, height: image.height, heightMap };
};

// Function to create 3D tile based on heightmap
const create3DTile = ({ width, height, heightMap }) => {
  const resolution = 50; // Reduce the resolution to avoid generating too many vertices
  const geometry = new THREE.PlaneGeometry(resolution, resolution, resolution - 1, resolution - 1);
  const vertices = geometry.attributes.position.array;

  let i = 0;
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const heightValue = heightMap[Math.floor(y * (height / resolution)) * width + Math.floor(x * (width / resolution))];
      vertices[i + 2] = heightValue / 255 * 10;  // Scale height (e.g., multiply by 10 for depth)
      i += 3;  // Move to next vertex
    }
  }

  return geometry;
};

// Function to export geometry as STL
const exportToSTL = (geometry, filePath) => {
  const exporter = new STLExporter();
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  const stlData = exporter.parse(mesh);
  fs.writeFileSync(filePath, stlData);
};

// Route to handle image upload and STL generation
app.post('/generate-stl', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }

  const imagePath = req.file.path; // Get the uploaded image path
  const outputPath = `./output/${Date.now()}.stl`; // Save STL file with a unique name

  try {
    const { width, height, heightMap } = await createHeightmapFromImage(imagePath);

    // Reduce the resolution for easier processing
    const geometry = create3DTile({
      width: width, 
      height: height, 
      heightMap: heightMap
    });

    // Check if geometry size is too large
    if (geometry.attributes.position.count > 10000) {
      console.warn("Geometry is too large, reducing resolution to prevent errors.");
      // Apply resolution reduction or other optimizations
    }

    exportToSTL(geometry, outputPath);
    res.download(outputPath, 'tile_output.stl', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error generating STL');
      } else {
        // Clean up the temporary STL file
        fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    console.error('Error creating STL:', error);
    res.status(500).send('Error generating STL');
  }
});
/////////////////////////////////////////////////////////////////////

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});