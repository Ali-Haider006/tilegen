const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const THREE = require('three');
const STLExporter = require('./exporters/STLExporter');
const path = require('path');

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

// Main function to convert image to STL
const convertImageToSTL = async (imagePath, outputPath) => {
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
      console.log(`STL file saved at ${outputPath}`);
    } catch (error) {
      console.error('Error creating STL:', error);
    }
  };
  

// Example Usage
const imagePath = './fabinaaci.jpeg';  // Path to the generated image
const outputPath = './tile_output.stl';     // Path to save the STL file
convertImageToSTL(imagePath, outputPath);
