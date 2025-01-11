import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
    
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const styles = {
    productList: {
      padding: 20,
      textAlign: 'center',
    },
    productGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 20,
    },
    productCard: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 15,
      width: 300,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
    },
    productImage: {
      width: '100%',
      height: 'auto',
      marginBottom: 15,
    },
    productCardH2: {
      fontSize: 20,
      marginBottom: 10,
    },
    productCardP: {
      fontSize: 16,
      marginBottom: 5,
    },
    del: {
      color: 'red',
    },
  };

  return (
    
    <div className="product-list" style={styles.productList}>
  <h1>Available Tile Products</h1>
  <div className="product-grid" style={styles.productGrid}>
    {products.map((product) => (
      <div key={product._id} className="product-card" style={styles.productCard}>
        <img
          src={product.imageUrl} // Replace with your Cloudinary image URL property name
          alt={product.name}
          className="product-image"
          style={styles.productImage}
        />
        <h2 className="product-card-h2" style={styles.productCardH2}>{product.name}</h2>
        <p className="product-card-p" style={styles.productCardP}>Category: {product.category}</p>
        <p className="product-card-p" style={styles.productCardP}>Size: {product.size}</p>
        <p className="product-card-p" style={styles.productCardP}>Quantity: {product.quantity}</p>
        <p className="product-card-p" style={styles.productCardP}>Price: ${product.new_price}</p>
        {product.old_price && (
          <p className="product-card-p" style={styles.productCardP}>
            Old Price: <del style={styles.del}>${product.old_price}</del>
          </p>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

export default ProductList;