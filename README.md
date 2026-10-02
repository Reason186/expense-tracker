# Expense Tracker 💰

A responsive web application built with **React** and **Redux Toolkit (RTK)** to track, filter, and organize daily expenses. This project demonstrates core RTK state management principles combined with drag-and-drop interactive UI and persistent local browser storage.

---

## 🚀 Features

- **Core Expense Management**: Add, edit, and delete expense entries seamlessly.
- **Category Filtering**: Filter expenses by specific categories (e.g., Food, Transport, Utilities).
- **Dynamic Total**: Real-time summary displaying running balance and categorized totals.
- **Drag-and-Drop Reordering**: Interactive vertical list sorting for expense tiles using drag-and-drop.
- **Data Persistence**: Automatic syncing with `localStorage` so data stays intact across page refreshes.

---

## 🛠️ Tech Stack & Key Concepts

- **React** (Functional Components, Hooks)
- **Redux Toolkit**:
  - `createSlice`: Centralized slice state containing reducer logic and generated action creators.
  - `configureStore`: Standardized Redux store setup with built-in middleware.
  - `useSelector` / `useDispatch`: Hook-based component interaction with the Redux store.
  - **Immer Integration**: Writing clear "mutating" logic inside slice reducers safely handled under the hood.
- **HTML5 Drag and Drop API** (or `@hello-pangea/dnd` / `react-beautiful-dnd`)
- **Browser LocalStorage API** for persistent state hydration.

---

## 📁 Project Structure

```text
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── CategoryFilter.jsx
│   │   ├── CategoryFilter.module.css
│   │   ├── CategoryItem.jsx
│   │   ├── DeleteConfirmation.jsx
│   │   ├── Expense.jsx
│   │   ├── ExpenseModal.jsx
│   │   ├── ExpenseModal.module.css
│   │   ├── Expense.module.css
│   │   ├── Expenses.jsx
│   │   ├── Expenses.module.css
│   │   ├── FilterItem.jsx
│   │   ├── StartMessage.jsx
│   │   ├── Topbar.jsx
│   │   └── Topbar.module.css
│   ├── index.css
│   ├── main.jsx
│   ├── slices
│   │   ├── categoriesSlice.js
│   │   └── expensesSlice.js
│   └── store.js
```
