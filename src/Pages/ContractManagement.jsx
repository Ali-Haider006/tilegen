import React, { useState } from 'react';

const ContractManagement = () => {
  const [contracts, setContracts] = useState([]);
  const [formData, setFormData] = useState({
    contractTitle: '',
    contractDescription: '',
    contractDate: '',
    status: 'Active',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Add new contract
  const addContract = () => {
    if (!formData.contractTitle || !formData.contractDescription) {
      alert('Please fill in all fields.');
      return;
    }

    setContracts((prevContracts) => [
      ...prevContracts,
      { ...formData, contractDate: new Date().toLocaleDateString() },
    ]);

    setFormData({ contractTitle: '', contractDescription: '', contractDate: '', status: 'Active' });
  };

  // Edit existing contract
  const editContract = (index) => {
    const contractToEdit = contracts[index];
    setFormData(contractToEdit);
    setEditingIndex(index);
  };

  // Save edited contract
  const saveEditedContract = () => {
    const updatedContracts = contracts.map((contract, index) =>
      index === editingIndex ? { ...formData } : contract
    );
    setContracts(updatedContracts);
    setFormData({ contractTitle: '', contractDescription: '', contractDate: '', status: 'Active' });
    setEditingIndex(null);
  };

  // Delete contract
  const deleteContract = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contract?');
    if (confirmDelete) {
      setContracts(contracts.filter((_, i) => i !== index));
    }
  };

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Contract Management</h1>
      <div className="contract-form">
        <h2>{editingIndex !== null ? 'Edit Contract' : 'Add New Contract'}</h2>
        <input
          type="text"
          name="contractTitle"
          value={formData.contractTitle}
          onChange={handleInputChange}
          placeholder="Contract Title"
        />
        <textarea
          name="contractDescription"
          value={formData.contractDescription}
          onChange={handleInputChange}
          placeholder="Contract Description"
        />
        <div>
          <label>Status: </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <button onClick={editingIndex !== null ? saveEditedContract : addContract}>
          {editingIndex !== null ? 'Save Changes' : 'Add Contract'}
        </button>
      </div>

      <h3>All Contracts</h3>
      {contracts.length === 0 ? (
        <p>No contracts available.</p>
      ) : (
        <table className="contract-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={index}>
                <td>{contract.contractTitle}</td>
                <td>{contract.contractDescription}</td>
                <td>{contract.contractDate}</td>
                <td>{contract.status}</td>
                <td>
                  <button onClick={() => editContract(index)}>Edit</button>
                  <button onClick={() => deleteContract(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .contract-form {
          margin-bottom: 20px;
        }

        input,
        textarea,
        select {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        button {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        .contract-table {
          width: 100%;
          border-collapse: collapse;
        }

        .contract-table th,
        .contract-table td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }

        .contract-table th {
          background-color: #f4f4f4;
        }

        .contract-table tr:hover {
          background-color: #f1f1f1;
        }

        .contract-table button {
          margin-right: 10px;
          background-color: #2196f3;
        }

        .contract-table button:hover {
          background-color: #1976d2;
        }
      `}</style>
    </div>
  );
};

export default ContractManagement;
