import { useDispatch } from "react-redux";

import styles from "./Expense.module.css";
import { toggleDeleting, toggleEditing } from "../slices/expensesSlice";

export default function Expense({ expense }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.row}>
      <span className={styles.remarks}>{expense.remarks}</span>
      <span>
        <span className={styles.category}>{expense.category}</span>
      </span>
      <span className={styles.amount}>
        ${Number(expense.amount).toFixed(2)}
      </span>
      <span className={styles.actions}>
        <button
          className={styles.iconButton}
          title="Edit"
          onClick={() => dispatch(toggleEditing(expense.id))}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`${styles.iconButton} ${styles.deleteButton}`}
          title="Delete"
          onClick={() => dispatch(toggleDeleting(expense.id))}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </span>
    </li>
  );
}
