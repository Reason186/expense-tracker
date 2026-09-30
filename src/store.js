import { configureStore } from "@reduxjs/toolkit";

import expensesReducer from "./slices/expensesSlice";
import categoriesReducer from "./slices/categoriesSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    categories: categoriesReducer,
  },
});

export default store;
