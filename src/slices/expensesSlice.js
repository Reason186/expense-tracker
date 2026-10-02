import { createSlice, nanoid } from "@reduxjs/toolkit";

export const initialState = {
  expenses: [],
  isAdding: false,
  isEditing: false,
  isDeleting: false,
  selectedExpense: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    toggleAdding(state) {
      state.isAdding = !state.isAdding;
    },

    addExpense: {
      prepare(remarks, amount, category) {
        return {
          payload: {
            id: nanoid(8),
            remarks,
            amount,
            category,
          },
        };
      },

      reducer(state, action) {
        state.expenses.push(action.payload);
        state.isAdding = false;
        state.selectedExpense = null;
      },
    },

    toggleDeleting(state, action) {
      state.isDeleting = !state.isDeleting;
      state.selectedExpense = action.payload;
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (elem) => elem.id !== action.payload,
      );
      state.isDeleting = false;
      state.selectedExpense = null;
    },

    toggleEditing(state, action) {
      state.isEditing = !state.isEditing;
      state.selectedExpense = action.payload;
    },

    editExpense: {
      prepare(id, remarks, amount, category) {
        return {
          payload: {
            id,
            remarks,
            amount,
            category,
          },
        };
      },

      reducer(state, action) {
        const expense = state.expenses.find(
          (elem) => elem.id === action.payload.id,
        );
        if (expense) {
          expense.remarks = action.payload.remarks;
          expense.amount = action.payload.amount;
          expense.category = action.payload.category;
        }
        state.isEditing = false;
      },
    },

    reorderExpenses(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  editExpense,
  toggleAdding,
  toggleEditing,
  toggleDeleting,
  reorderExpenses,
} = expensesSlice.actions;

export default expensesSlice.reducer;
