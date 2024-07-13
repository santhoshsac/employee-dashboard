import React from 'react';
import './ViewEmployeeConponent.css';

const ViewEmployeeComponent = ({ employee, onClose }) => {
  console.log("ViewEmployeeComponent", employee);
  if (!employee) return null;
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Employee Details</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>Emp Id:</strong> {employee.id}</p>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.mobile}</p>
            <p><strong>Job Role:</strong> {employee.jobRole}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
