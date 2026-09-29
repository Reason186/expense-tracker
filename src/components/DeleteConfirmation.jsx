import Button from "./Button";
import styles from "./ExpenseModal.module.css";
import { deleteExpense, toggleDeleting } from "../slices/expensesSlice";

import { useDispatch, useSelector } from "react-redux";

export default function DeleteConfirmation() {
  const dispatch = useDispatch();
  const { selectedExpense } = useSelector((store) => store.expenses);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Confirm Delete?</h2>
        </div>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            onClick={() => dispatch(toggleDeleting(selectedExpense))}
          >
            Close
          </Button>
          <Button
            variant="delete"
            onClick={() => dispatch(deleteExpense(selectedExpense))}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
