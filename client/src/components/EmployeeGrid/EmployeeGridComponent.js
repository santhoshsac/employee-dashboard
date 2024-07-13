import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEmployees,
  deleteEmployee
} from '../../features/employeeAction';
import { toast } from 'react-toastify';
import ViewEmployeeComponent from '../ViewEmployee/ViewEmployeeComponent';
import AddEmployeeComponent from '../AddEmployee/AddEmployeeComponent';

function EmployeeGridComponent() {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);  
  const [showaction, setShowaction] = useState('');

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = () => {
    setShowAddEmployee(true);
    setShowaction('Add');
  };

  const handleUpdateEmployee = (id) => {
    setShowAddEmployee(true);
    setShowaction('Edit');
    const employee = employees.find(emp => emp.id === id);
    setSelectedItem(employee);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      await dispatch(deleteEmployee(employeeId));
      toast.success('Employee deleted successfully!');
    }
  };

 const handleViewEmployee = (id) => {
    setShowPopup(true);
    const employee = employees.find(emp => emp.id === id);
    setSelectedItem(employee);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  const handleCloseAddEmployee = () => {
    setShowAddEmployee(false);
  };

  return (
  <div>
    <div className="container">
      <h2 className="my-4">Employee Dashboard
        <button className="btn btn-primary float-end ms-2" onClick={handleAddEmployee}>Add New Employee</button>
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Job Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 && employees.map(employee => (
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.jobRole}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2"
                      onClick={() => handleViewEmployee(employee.id)}>View</button>
                  <button className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdateEmployee(employee.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {
              employees.length == 0 && <div class="alert alert-danger">No Employee Found</div>
            }
          </tbody>
        </table>
      </div>
    </div>
    {showPopup && <ViewEmployeeComponent employee={selectedItem} onClose={handleClosePopup} />}
    {showAddEmployee && <AddEmployeeComponent onClose={handleCloseAddEmployee} employeeDetails={selectedItem} action={showaction}/>}
  </div>
  );
}

export default EmployeeGridComponent;
