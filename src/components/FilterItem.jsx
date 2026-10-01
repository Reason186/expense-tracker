import { useDispatch, useSelector } from "react-redux";

import styles from "./CategoryFilter.module.css";
import { addFilterItem, removeFilterItem } from "../slices/categoriesSlice";

export default function FilterItem({ category }) {
  const { filteredCategories } = useSelector((store) => store.categories);

  const isChecked = filteredCategories.includes(category);

  const dispatch = useDispatch();

  return (
    <li className={styles.option}>
      <label className={styles.optionLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={() =>
            isChecked
              ? dispatch(removeFilterItem(category))
              : dispatch(addFilterItem(category))
          }
        />
        {category}
      </label>
    </li>
  );
}
