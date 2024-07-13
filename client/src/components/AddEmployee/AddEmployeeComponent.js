import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewEmployee, updateEmployee } from '../../features/employeeAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddEmployeeComponent = ({action, employeeDetails, onClose }) => {
  const dispatch = useDispatch();
  const initialFormData = {
    id: '',
    name: '',
    email: '',
    mobile: '',
    jobRole: '',
  }
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if(action=='Edit') {
        const employee = {
            id: employeeDetails.id,
            name: employeeDetails.name,
            email: employeeDetails.email,
            mobile: employeeDetails.mobile,
            jobRole: employeeDetails.jobRole,
        }
        setFormData(employee);
    }
  },[employeeDetails])

  const [formErrors, setFormErrors] = useState(initialFormData);

  const validateForm = () => {
    let valid = true;
    const errors = {
      id: '',
      name: '',
      email: '',
      mobile: '',
      jobRole: '',
    };

    if (formData.id.length < 4) {
        errors.id = 'Employee ID must be at least 4 characters';
        valid = false;
    }

    if (formData.name.length < 3 || formData.name.length > 15) {
      errors.name = 'Name must be between 3 and 15 characters';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    const mobileRegex = /^\d{10}$/; 
    if (!formData.mobile.match(mobileRegex)) {
      errors.mobile = 'Invalid mobile number format';
      valid = false;
    }

    if (!formData.jobRole) {
      errors.jobRole = 'Please select a job role';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newEmployee = { ...formData };
      console.log(newEmployee)
      if (action === 'Add') {
        await dispatch(addNewEmployee(newEmployee));
        toast.success('Employee Added Successfully!');
      } else if (action === 'Edit') {
        await dispatch(updateEmployee(newEmployee));
        toast.success('Employee Updated Successfully!');
      }

     
      onClose();
    } else {
      alert('Please fix the errors in the form before submitting.');
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
          {action === 'Add' && (
                <h5 className="modal-title">Add New Employee</h5>
            )}
            {action === 'Edit' && (
                <h5 className="modal-title">Edit Employee</h5>
            )}
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="employeeId" className="form-label"> ID</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.id && 'is-invalid'}`}
                  id="employeeId"
                  name="id"
                  value={formData.id}
                  onChange={handleChange} disabled={action === 'Edit' ? true : false} 
                />
                <div className="invalid-feedback">{formErrors.id}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.name && 'is-invalid'}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{formErrors.name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email && 'is-invalid'}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{formErrors.email}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.mobile && 'is-invalid'}`}
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{formErrors.mobile}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="jobRole" className="form-label">Job Role</label>
                <select
                  className={`form-select ${formErrors.jobRole && 'is-invalid'}`}
                  id="jobRole"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                >
                  <option value="">Select Job Role</option>
                  <option value="Software Eng1">Software Eng1</option>
                  <option value="Software Eng2">Software Eng2</option>
                  <option value="Software Eng3">Software Eng3</option>
                </select>
                <div className="invalid-feedback">{formErrors.jobRole}</div>
              </div>
              {action === 'Add' && (
                <button type="submit" className="btn btn-primary">Add Employee</button>
              )}
              {action === 'Edit' && (
                <button type="submit" className="btn btn-primary">Update Employee</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
