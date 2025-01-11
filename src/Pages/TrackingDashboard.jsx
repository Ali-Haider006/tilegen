import React, { useState } from "react";

// Mock Data for Orders
const orders = [
  {
    orderId: "ORD12345",
    status: "In Transit",
    estimatedDelivery: "2024-12-10",
    items: ["Item 1", "Item 2"],
    trackingNumber: "TRK123456789",
    trackingProgress: 10, // Percent of journey completed
  },
  {
    orderId: "ORD67890",
    status: "Delivered",
    estimatedDelivery: "2024-12-06",
    items: ["Item 3", "Item 4"],
    trackingNumber: "TRK987654321",
    trackingProgress: 100, // Order delivered
  },
];

const TrackingDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Order Tracking Dashboard</h1>

      {/* Order List Section */}
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h2>Your Orders</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {orders.map((order) => (
              <li
                key={order.orderId}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: selectedOrder?.orderId === order.orderId ? "#f0f8ff" : "#fff",
                }}
                onClick={() => handleOrderClick(order)}
              >
                <strong>Order ID:</strong> {order.orderId} <br />
                <strong>Status:</strong> {order.status} <br />
                <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
              </li>
            ))}
          </ul>
        </div>

        {/* Order Details Section */}
        <div style={{ flex: 2 }}>
          <h2>Order Details</h2>
          {selectedOrder ? (
            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
              <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Mock Tracking Map */}
              <h3>Tracking Map</h3>
              <div
                style={{
                  position: "relative",
                  height: "150px",
                  background: "linear-gradient(to right, #ddd, #4caf50)",
                  borderRadius: "5px",
                  margin: "20px 0",
                  overflow: "hidden",
                }}
              >
                {/* Mock Path */}
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: `${selectedOrder.trackingProgress}%`,
                    background: "#4caf50",
                    transition: "width 0.3s ease",
                  }}
                ></div>

                {/* Waypoints */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10%",
                    transform: "translateY(-50%)",
                    width: "15px",
                    height: "15px",
                    background: selectedOrder.trackingProgress >= 10 ? "#4caf50" : "#fff",
                    border: "2px solid #4caf50",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translateY(-50%)",
                    width: "15px",
                    height: "15px",
                    background: selectedOrder.trackingProgress >= 50 ? "#4caf50" : "#fff",
                    border: "2px solid #4caf50",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "90%",
                    transform: "translateY(-50%)",
                    width: "15px",
                    height: "15px",
                    background: selectedOrder.trackingProgress === 100 ? "#4caf50" : "#fff",
                    border: "2px solid #4caf50",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <p>Select an order to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingDashboard;
