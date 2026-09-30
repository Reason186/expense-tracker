import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: ["Food", "Transport", "Utilities", "Entertainment"],
  isAddingCategory: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleAddingCategory(state) {
      state.isAddingCategory = !state.isAddingCategory;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
      state.isAddingCategory = false;
    },
  },
});

export const { toggleAddingCategory, addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
