import styles from "./ExpenseModal.module.css";

export default function CategoryItem({ category, selectCategory }) {
  return (
    <li
      className={styles.option}
      id={category}
      onMouseDown={selectCategory}
    >
      {category}
    </li>
  );
}
