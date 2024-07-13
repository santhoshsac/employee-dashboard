import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, addNewEmployee, updateEmployee, deleteEmployee } from './employeeAction';

const EmployeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;
        state.employees = state.employees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      });
  },
});

export default EmployeesSlice.reducer;


