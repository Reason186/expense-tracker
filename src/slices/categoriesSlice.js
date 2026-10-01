import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: ["Food", "Transport", "Utilities", "Entertainment"],
  isAddingCategory: false,
  isFiltering: false,
  filteredCategories: [],
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
  toggleAddingCategory,
  addCategory,
  toggleIsFiltering,
  addFilterItem,
  removeFilterItem,
  clearFilter,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
