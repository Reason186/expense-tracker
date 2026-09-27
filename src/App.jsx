import Expenses from "./components/Expenses";
import "./App.css";
import Topbar from "./components/Topbar";
import { useSelector } from "react-redux";
import AddExpenseModal from "./components/AddExpenseModal";

export default function App() {
  const { isAdding } = useSelector((store) => store.expenses);

  return (
    <div className="app">
      {isAdding && <AddExpenseModal />}
      <Topbar />
      <Expenses />
    </div>
  );
}
