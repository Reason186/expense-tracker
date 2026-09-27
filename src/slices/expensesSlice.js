import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  expenses: [
    {
      id: 1,
      remarks: "Bought an Apple",
      amount: 20,
      category: "Food",
    },
  ],
  isAdding: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: {
      prepare(remarks, amount, category) {
        return {
          payload: {
            id: nanoid(3),
            remarks,
            amount,
            category,
          },
        };
      },

      reducer(state, action) {
        state.expenses.push(action.payload);
        state.isAdding = false;
      },
    },
    isAddingExpense(state) {
      state.isAdding = !state.isAdding;
    },
  },
});

export const { addExpense, isAddingExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
