import React from "react";
import "./task-list.css";

import Task from "../task";

function TaskList({ todos, onDeleted, onToggleDone, onTogglePlay, updateTimer }) {
  const elements = todos.map((item) => {
    const { id, done, ...itemProps } = item;

    let classNames = "";
    if (done) {
      classNames += "completed";
    }

    return (
      <li key={id} className={classNames}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onTogglePlay={() => onTogglePlay(id)}
          updateTimer={() => updateTimer(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defoultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
};

export default TaskList;
