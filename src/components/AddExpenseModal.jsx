import Button from "./Button";
import styles from "./AddExpenseModal.module.css";
import { addExpense, isAddingExpense } from "../slices/expensesSlice";

import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddExpenseModal() {
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  function onAddExpense() {
    if (!remarks || !amount || !category) return;
    dispatch(addExpense(remarks, amount, category));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Expense</h2>
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
              onChange={(e) => setAmount(Number(e.target.value))}
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
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <a
              href="#"
              className={styles.newCategoryLink}
            >
              + New category
            </a>
          </div>
        </form>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            onClick={() => dispatch(isAddingExpense())}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onAddExpense}
          >
            Create Expense
          </Button>
        </div>
      </div>
    </div>
  );
}
