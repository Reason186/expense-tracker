import { useDispatch } from "react-redux";
import Button from "./Button";
import { topBar, title } from "./Topbar.module.css";
import { toggleAdding } from "../slices/expensesSlice";

export default function Topbar() {
  const dispatch = useDispatch();

  return (
    <div className={topBar}>
      <h1 className={title}>Expense Tracker</h1>
      <Button
        variant="primary"
        action="add"
        onClick={() => dispatch(toggleAdding())}
      >
        Add Expense
      </Button>
    </div>
  );
}
