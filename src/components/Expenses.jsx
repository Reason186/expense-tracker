import { useSelector } from "react-redux";

import styles from "./Expenses.module.css";
import Expense from "./Expense";
import StartMessage from "./StartMessage";

export default function Expenses() {
  const { expenses } = useSelector((state) => state.expenses);

  return (
    <div className={styles.expensesTable}>
      <div className={styles.header}>
        <span>Remarks</span>
        <span className={styles.categoryHeader}>
          Category
          <button
            className={styles.filterButton}
            title="Filter by category"
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
        </span>
        <span className={styles.amountCol}>Amount</span>
        <span className={styles.actionsCol}>Actions</span>
      </div>

      <ul className={styles.list}>
        {expenses.length !== 0 ? (
          expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
            />
          ))
        ) : (
          <StartMessage />
        )}
      </ul>
    </div>
  );
}
