import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ContractList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Fetch contracts from localStorage
    const storedContracts = JSON.parse(localStorage.getItem('contracts')) || [];
    setContracts(storedContracts);
  }, []);

  const handleExtendEndDate = (index) => {
    const newEndDate = prompt("Enter a new end date (YYYY-MM-DD):");
    if (newEndDate) {
      const updatedContracts = [...contracts];
      updatedContracts[index].contractEndDate = newEndDate;
      setContracts(updatedContracts);
      localStorage.setItem('contracts', JSON.stringify(updatedContracts));
    }
  };

  const handleDeleteContract = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contract?");
    if (confirmDelete) {
      const updatedContracts = contracts.filter((_, i) => i !== index);
      setContracts(updatedContracts);
      localStorage.setItem('contracts', JSON.stringify(updatedContracts));
    }
  };

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <h4>Stored Contracts</h4>
      {contracts.length === 0 ? (
        <p>No contracts found. Please add some contracts first.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Contract Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Terms</th>
                <th>Back-Off Mechanism</th>
                <th>Report Frequency</th>
                <th>Renewal Option</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={index}>
                  <td>{contract.contractName}</td>
                  <td>{contract.contractStartDate}</td>
                  <td>{contract.contractEndDate}</td>
                  <td>{contract.contractStatus}</td>
                  <td>{contract.contractTerms}</td>
                  <td>{contract.backOffMechanism}</td>
                  <td>{contract.reportFrequency}</td>
                  <td>{contract.renewalOption ? "Yes" : "No"}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-info mr-2" 
                      onClick={() => handleExtendEndDate(index)}
                    >
                      Extend End Date
                    </button>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleDeleteContract(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContractList;
