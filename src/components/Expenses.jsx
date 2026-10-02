import { useDispatch, useSelector } from "react-redux";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import styles from "./Expenses.module.css";
import Expense from "./Expense";
import StartMessage from "./StartMessage";
import { useMemo } from "react";

import { toggleIsFiltering } from "../slices/categoriesSlice";
import { reorderExpenses } from "../slices/expensesSlice";
import CategoryFilter from "./CategoryFilter";

export default function Expenses() {
  const { expenses } = useSelector((state) => state.expenses);
  const { isFiltering, filteredCategories } = useSelector(
    (state) => state.categories,
  );
  const dispatch = useDispatch();

  function filterExpenses() {
    let filteredExpenses = [];

    if (filteredCategories.length === 0) return filteredExpenses;

    expenses.map((expense) => {
      if (filteredCategories.includes(expense.category)) {
        filteredExpenses.push(expense);
      }
    });

    return filteredExpenses;
  }
  const filteredExpenses = filterExpenses();

  const displayedExpenses =
    filteredCategories.length > 0 ? filteredExpenses : expenses;

  const total = useMemo(
    () => displayedExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [displayedExpenses],
  );

  return (
    <div className={styles.expensesTable}>
      <div className={styles.header}>
        <span>Remarks</span>
        <span className={styles.categoryHeader}>
          Category
          <button
            className={styles.filterButton}
            title="Filter by category"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleIsFiltering());
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 5h16l-6 8v6l-4-2v-4L4 5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isFiltering && <CategoryFilter />}
        </span>
        <span className={styles.amountCol}>Amount</span>
        <span className={styles.actionsCol}>Actions</span>
      </div>

      <DragDropProvider
        onDragEnd={(event) => {
          if (filteredCategories.length > 0) return;
          if (event.canceled) return;

          const reorderedExpenses = move(expenses, event);

          dispatch(reorderExpenses(reorderedExpenses));
        }}
      >
        <ul className={styles.list}>
          {displayedExpenses.length > 0 ? (
            displayedExpenses.map((expense, index) => (
              <Expense
                key={expense.id}
                id={expense.id}
                index={index}
                expense={expense}
              />
            ))
          ) : (
            <StartMessage />
          )}
        </ul>
      </DragDropProvider>

      <div className={styles.totalRow}>
        <span>Total</span>
        <span className={styles.totalAmount}>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
