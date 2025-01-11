import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContractManagement.css'; // Add your custom styles here
import { useNavigate } from "react-router-dom";

const ContractManagementForm = () => {
  const [contractName, setContractName] = useState('');
  const [contractTerms, setContractTerms] = useState('');
  const [contractStatus, setContractStatus] = useState('Active');
  const [backOffMechanism, setBackOffMechanism] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [reportFrequency, setReportFrequency] = useState('Monthly');
  const [renewalOption, setRenewalOption] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contractData = {
      contractName,
      contractTerms,
      contractStatus,
      backOffMechanism,
      contractStartDate,
      contractEndDate,
      reportFrequency,
      renewalOption,
    };

    try {
      // Save to localStorage
      const existingContracts = JSON.parse(localStorage.getItem('contracts')) || [];
      localStorage.setItem('contracts', JSON.stringify([...existingContracts, contractData]));
      console.log('Contract saved to local storage successfully.');
      alert('Contract saved successfully!');
      navigate('/ContractList');
      // Clear form
      setContractName('');
      setContractTerms('');
      setContractStatus('Active');
      setBackOffMechanism('');
      setContractStartDate('');
      setContractEndDate('');
      setReportFrequency('Monthly');
      setRenewalOption(false);
    } catch (error) {
      console.error('Error saving the contract to local storage:', error);
      alert('Failed to save the contract. Please try again.');
    }
  };

  return (
    <div className="container contract-form" style={{ width: '50%', marginTop: '80px' }}>
      {/* Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <h4>Please fill out this contract form</h4>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Contract Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="E.g. Vendor Agreement"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)} 
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label>Contract Start Date</label>
            <input 
              type="date" 
              className="form-control"
              value={contractStartDate}
              onChange={(e) => setContractStartDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Contract End Date</label>
            <input 
              type="date" 
              className="form-control"
              value={contractEndDate}
              onChange={(e) => setContractEndDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label>Contract Status</label>
            <select 
              className="form-control"
              value={contractStatus}
              onChange={(e) => setContractStatus(e.target.value)}
              required
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Contract Terms</label>
          <textarea 
            className="form-control" 
            rows="4"
            value={contractTerms}
            onChange={(e) => setContractTerms(e.target.value)}
            placeholder="Enter contract terms here..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Back-Off Mechanism</label>
          <textarea 
            className="form-control" 
            rows="3"
            value={backOffMechanism}
            onChange={(e) => setBackOffMechanism(e.target.value)}
            placeholder="Describe any fallback or back-off mechanisms..."
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Report Frequency</label>
            <select 
              className="form-control"
              value={reportFrequency}
              onChange={(e) => setReportFrequency(e.target.value)}
              required
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group col-md-6 form-check">
            <input 
              type="checkbox" 
              className="form-check-input"
              checked={renewalOption}
              onChange={(e) => setRenewalOption(e.target.checked)}
            />
            <label className="form-check-label">Enable Contract Renewal</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ContractManagementForm;
