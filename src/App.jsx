import { useSelector } from "react-redux";
import "./App.css";
import Expenses from "./components/Expenses";
import Topbar from "./components/Topbar";
import ExpenseModal from "./components/ExpenseModal";
import DeleteConfirmation from "./components/DeleteConfirmation";

export default function App() {
  const { isAdding, isEditing, isDeleting } = useSelector(
    (store) => store.expenses,
  );

  return (
    <div className="app">
      {isAdding && <ExpenseModal />}
      {isEditing && <ExpenseModal />}
      {isDeleting && <DeleteConfirmation />}
      <Topbar />
      <Expenses />
    </div>
  );
}
