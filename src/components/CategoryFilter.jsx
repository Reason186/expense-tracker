import { useDispatch, useSelector } from "react-redux";

import { clearFilter, toggleIsFiltering } from "../slices/categoriesSlice";
import styles from "./CategoryFilter.module.css";
import FilterItem from "./FilterItem";
import { useEffect, useRef } from "react";

export default function CategoryFilter() {
  const { categories } = useSelector((store) => store.categories);

  const dispatch = useDispatch();
  const filterRef = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (filterRef.current && filterRef.current.contains(e.target)) {
          return;
        }

        dispatch(toggleIsFiltering());
      }

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    },
    [dispatch],
  );

  return (
    <div
      className={styles.popover}
      ref={filterRef}
    >
      <div className={styles.popoverHeader}>
        <span>Filter by category</span>
        <button
          className={styles.clearLink}
          onClick={() => dispatch(clearFilter())}
        >
          Clear
        </button>
      </div>

      <ul className={styles.optionList}>
        {categories.map((category, i) => (
          <FilterItem
            key={i}
            category={category}
          />
        ))}
      </ul>
    </div>
  );
}
