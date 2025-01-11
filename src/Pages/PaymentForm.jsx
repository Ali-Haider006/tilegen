// App.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ShopContextProvider from '../Context/ShopContext';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51Q13gSASMqxlnj7IO85eLjTdvYlepdwYnWyOsYYjWNkP8ossDZG4N7JBeIrbY6vPbLqCT6sdJMPHU5Hx5UvezwsL00KRN30qZM');

// components/Payment.jsx
const Payment = () => {
  const navigate = useNavigate();
  // const { cartItems, setcartItems } = useContext(ShopContext);
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(''); // New state for amount
  const [description, setDescription] = useState(''); // New state for description

  const MINIMUM_AMOUNT = 50; // Example minimum amount for USD (0.50 USD)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // Validate that the amount meets the minimum required amount
    if (parseFloat(amount) < MINIMUM_AMOUNT / 100) {
      setError(`The amount must be greater than or equal to ${MINIMUM_AMOUNT / 100} USD.`);
      setProcessing(false);
      return;
    }

    // Create payment intent on the backend
    const response = await fetch('http://localhost:5000/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount) * 100, // Amount in cents (Stripe expects amounts in cents for USD)
        currency: 'usd', // Default currency
        description: description || 'No description provided',
      }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setProcessing(false);
      return;
    }

    const clientSecret = data.clientSecret;

    // Confirm the payment on the client
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name', // Optional, can prompt the user for this
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // setcartItems([]); // Clear cart upon successful payment
      navigate('/TrackingDashboard');
    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Amount (USD):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
            placeholder="Enter amount in USD"
            required
            min="0.50" // Enforcing minimum amount on frontend
            step="0.01"
          />
        </label>
        <label style={styles.label}>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
            placeholder="Enter order description"
          />
        </label>
        <div style={styles.cardElement}>
          <CardElement onChange={handleChange} options={cardStyle} />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" disabled={processing || succeeded} style={styles.button}>
          {processing ? 'Processing…' : 'Pay Now'}
        </button>
        {succeeded && <div style={styles.success}>Payment succeeded! Thank you for your purchase.</div>}
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    color: '#333',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    width: '100%',
    marginBottom: '20px',
  },
  cardElement: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    marginBottom: '20px',
    backgroundColor: '#fff',
  },
  button: {
    padding: '12px',
    backgroundColor: '#6772e5',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#e74c3c',
    marginBottom: '10px',
    fontSize: '14px',
    textAlign: 'center',
  },
  success: {
    color: '#2ecc71',
    marginTop: '20px',
    fontSize: '16px',
    textAlign: 'center',
  },
};

// Card element styles
const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentForm = () => {
  return (
    <ShopContextProvider>
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </ShopContextProvider>
  );
};

export default PaymentForm;
