import Button from "./Button";
import styles from "./ExpenseModal.module.css";
import NewCategoryModal from "./NewCategoryModal";
import CategoryItem from "./CategoryItem";

import {
  editExpense,
  addExpense,
  toggleAdding,
  toggleEditing,
} from "../slices/expensesSlice";
import { toggleAddingCategory } from "../slices/categoriesSlice";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ExpenseModal() {
  const dispatch = useDispatch();
  const { expenses, selectedExpense } = useSelector((store) => store.expenses);
  const { categories, isAddingCategory } = useSelector(
    (store) => store.categories,
  );

  const expense = selectedExpense
    ? expenses.find((expense) => expense.id === selectedExpense)
    : null;

  const [remarks, setRemarks] = useState(expense?.remarks || "");
  const [amount, setAmount] = useState(expense?.amount || "");
  const [category, setCategory] = useState(expense?.category || "");

  const inputRef = useRef();

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  const handleAction = useCallback(
    function () {
      if (!remarks || !amount || !category) return;
      dispatch(
        selectedExpense
          ? editExpense(selectedExpense, remarks, amount, category)
          : addExpense(remarks, Number(amount), category),
      );
    },
    [amount, category, dispatch, remarks, selectedExpense],
  );

  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.code === "Enter" && !isAddingCategory) {
          handleAction();
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return function () {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [handleAction, isAddingCategory],
  );

  function handleClose() {
    dispatch(selectedExpense ? toggleEditing() : toggleAdding());
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {selectedExpense ? "Edit" : "Add"} Expense
          </h2>
        </div>

        <form className={styles.form}>
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="remarks"
            >
              Remarks
            </label>
            <input
              id="remarks"
              type="text"
              placeholder="e.g. Groceries at Whole Foods"
              className={styles.input}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              ref={inputRef}
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              id="amount"
              type="text"
              placeholder="0.00"
              className={styles.input}
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val)) {
                  setAmount(val);
                }
              }}
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category, i) => (
                <CategoryItem
                  category={category}
                  key={i}
                />
              ))}
            </select>
            <button
              className={styles.newCategoryLink}
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleAddingCategory());
              }}
            >
              + New Category
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAction}
          >
            {selectedExpense ? "Confirm" : "Create Expense"}
          </Button>
        </div>
      </div>

      {isAddingCategory && <NewCategoryModal />}
    </div>
  );
}
