import Button from "./Button";
import styles from "./ExpenseModal.module.css";
import CategoryItem from "./CategoryItem";

import {
  editExpense,
  addExpense,
  toggleAdding,
  toggleEditing,
} from "../slices/expensesSlice";

import { addCategory } from "../slices/categoriesSlice";

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
  const [categoryisActive, setCategoryIsActive] = useState(false);

  const searchedCategories = categories.map((elem) =>
    elem.toLowerCase().includes(category.toLowerCase()) ? elem : null,
  );

  const inputRef = useRef();

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  const handleAction = useCallback(
    function () {
      if (!remarks || !amount || !category) return;
      const newCategory = category.charAt(0).toUpperCase() + category.slice(1);
      dispatch(
        selectedExpense
          ? editExpense(selectedExpense, remarks, amount, newCategory)
          : addExpense(remarks, Number(amount), newCategory),
      );

      if (!categories.includes(newCategory)) dispatch(addCategory(newCategory));
    },
    [amount, category, dispatch, remarks, selectedExpense, categories],
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

  function handleSelectCategory(e) {
    setCategory(e.target.id);
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
                  setAmount(Number(val));
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
            <input
              id="category"
              className={styles.select}
              placeholder="e.g. Food"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setCategoryIsActive(true)}
              onBlur={() => setCategoryIsActive(false)}
            />
            {categoryisActive && searchedCategories.at(0) !== null && (
              <ul className={styles.categoryDropdown}>
                {searchedCategories.map(
                  (category, i) =>
                    category && (
                      <CategoryItem
                        category={category}
                        key={i}
                        selectCategory={handleSelectCategory}
                      />
                    ),
                )}
              </ul>
            )}
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
    </div>
  );
}
