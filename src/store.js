import { configureStore } from "@reduxjs/toolkit";

import expensesReducer, {
  initialState as expensesInitialState,
} from "./slices/expensesSlice";
import categoriesReducer, {
  initialState as categoriesInitialState,
} from "./slices/categoriesSlice";

function loadState() {
  const storedState = JSON.parse(localStorage.getItem("storedState"));
  if (!storedState)
    return {
      expenses: expensesInitialState,
      categories: categoriesInitialState,
    };
  return {
    expenses: { ...expensesInitialState, expenses: storedState.expenses },
    categories: {
      ...categoriesInitialState,
      categories: storedState.categories,
    },
  };
}

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    categories: categoriesReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  const {
    categories: { categories: categoriesList },
    expenses: { expenses: expensesList },
  } = store.getState();

  const newState = { expenses: expensesList, categories: categoriesList };

  localStorage.setItem("storedState", JSON.stringify(newState));
});

export default store;
