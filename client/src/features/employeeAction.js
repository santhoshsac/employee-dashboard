import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/employees';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addNewEmployee = createAsyncThunk('employees/addNewEmployee', async (initialEmployee) => {
  const response = await axios.post(apiUrl, initialEmployee);
  return response.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (updatedEmployee) => {
  const response = await axios.put(`${apiUrl}/${updatedEmployee.id}`, updatedEmployee);
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employeeId) => {
  await axios.delete(`${apiUrl}/${employeeId}`);
  return employeeId;
});