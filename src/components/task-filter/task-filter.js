import React from "react";

import "./task-filter.css";

function TaskFilter({ filterValue, onFilterChange }) {
  const buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => {
        return (
          <li key={name}>
            <button
              type="button"
              className={filterValue === name ? "selected" : ""}
              onClick={() => onFilterChange(name)}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
};

export default TaskFilter;
