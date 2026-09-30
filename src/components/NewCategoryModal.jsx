import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { toggleAddingCategory, addCategory } from "../slices/categoriesSlice";
import styles from "./NewCategoryModal.module.css";

export default function NewCategoryModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const inputRef = useRef();

  const handleAdd = useCallback(
    function () {
      if (!name) return;
      dispatch(addCategory(name));
    },
    [dispatch, name],
  );

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.code === "Enter") {
          handleAdd();
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return function () {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [handleAdd],
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Category</h2>
        </div>

        <form className={styles.form}>
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="categoryName"
            >
              Category name
            </label>
            <input
              id="categoryName"
              type="text"
              placeholder="e.g. Subscriptions"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={inputRef}
            />
          </div>
        </form>

        <div className={styles.footer}>
          <Button
            variant="secondary"
            onClick={() => dispatch(toggleAddingCategory())}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
