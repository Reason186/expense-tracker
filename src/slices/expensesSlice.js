import { createSlice, nanoid } from "@reduxjs/toolkit";

export const initialState = {
  expenses: [
    {
      id: "1",
      remarks: "Bought an Apple",
      amount: 20,
      category: "Food",
    },
    {
      id: "2",
      remarks: "Paid monthly electricity bill",
      amount: 75,
      category: "Utilities",
    },
    {
      id: "3",
      remarks: "Filled up gas tank",
      amount: 45,
      category: "Transportation",
    },
    {
      id: "4",
      remarks: "Bought groceries at supermarket",
      amount: 120,
      category: "Food",
    },
    {
      id: "5",
      remarks: "Purchased a sci-fi paperback",
      amount: 15,
      category: "Entertainment",
    },
    {
      id: "6",
      remarks: "Monthly gym membership fee",
      amount: 50,
      category: "Health & Fitness",
    },
    {
      id: "7",
      remarks: "Grabbed iced coffee with a colleague",
      amount: 6,
      category: "Food",
    },
    {
      id: "8",
      remarks: "Subscribed to streaming service",
      amount: 14,
      category: "Entertainment",
    },
    {
      id: "9",
      remarks: "Bought a new desk lamp",
      amount: 35,
      category: "Home",
    },
    {
      id: "10",
      remarks: "Paid for ride-share home",
      amount: 22,
      category: "Transportation",
    },
    {
      id: "11",
      remarks: "Bought a birthday gift for friend",
      amount: 40,
      category: "Gifts",
    },
  ],
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
