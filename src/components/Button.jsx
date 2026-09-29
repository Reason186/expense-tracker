import { primaryButton, deleteButton, secButton } from "./Button.module.css";

export default function Button({ children, onClick, variant, action = "" }) {
  return (
    <button
      className={
        variant === "primary"
          ? primaryButton
          : variant === "delete"
            ? deleteButton
            : secButton
      }
      onClick={onClick}
    >
      {variant === "primary" && action === "add" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
