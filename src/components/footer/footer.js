import React from "react";
import "./footer.css";

import TaskFilter from "../task-filter/task-filter";

function Footer({ toDo, onCLearCompleted, filterValue, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter filterValue={filterValue} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onCLearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onCLearCompleted: () => {},
  onFilterChange: () => {},
};

export default Footer;
