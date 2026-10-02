import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categories: ["Food", "Transport", "Utilities", "Entertainment"],
  isFiltering: false,
  filteredCategories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    toggleIsFiltering(state) {
      state.isFiltering = !state.isFiltering;
    },
    addFilterItem(state, action) {
      state.filteredCategories.push(action.payload);
    },
    removeFilterItem(state, action) {
      state.filteredCategories = state.filteredCategories.filter(
        (elem) => elem !== action.payload,
      );
    },
    clearFilter(state) {
      state.filteredCategories = [];
      state.isFiltering = false;
    },
  },
});

export const {
  addCategory,
  toggleIsFiltering,
  addFilterItem,
  removeFilterItem,
  clearFilter,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
