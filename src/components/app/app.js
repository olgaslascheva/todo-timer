import React, { useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer/footer";

function App() {
  let maxId = useRef(100);

  function createItem(title, min, sec, time = Date.now()) {
    maxId += 1;
    return {
      title,
      done: false,
      time: formatDistanceToNow(new Date(time)),
      min: min === "" ? 0 : min,
      sec: sec === "" ? 0 : sec,
      isCounting: false,
      id: maxId,
    };
  }

  const [filterValue, setFilterValue] = useState("all");
  const [todoData, setTodoData] = useState([
    createItem("Task 1", 12, 25, "November 8, 2022 03:24:00"),
    createItem("Task 2", 13, 26, "November 9, 2022 05:25:00"),
    createItem("Task 3", 14, 27, "November 10, 2022 13:06:00"),
  ]);

  const filterTodo = () => {
    switch (filterValue) {
      case "all":
        return todoData;
      case "active":
        return todoData.filter((item) => !item.done);
      case "completed":
        return todoData.filter((item) => item.done);
      default:
        return todoData;
    }
  };

  const onFilterChange = (filterName) => {
    setFilterValue(filterName);
  };

  const onToggleDone = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldItem = data[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      return [...data.slice(0, idx), ...data.slice(idx + 1)];
    });
  };

  const onCLearCompleted = () => {
    setTodoData((data) => {
      return data.filter((el) => !el.done);
    });
  };

  const onTogglePlay = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldItem = data[idx];
      const newItem = { ...oldItem, isCounting: !oldItem.isCounting };

      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const updateTimer = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);

      const oldItem = data[idx];
      const newItem = {
        ...oldItem,
        sec: Number(oldItem.sec) === 59 ? 0 : Number(oldItem.sec) + 1,
        min: Number(oldItem.sec) === 59 ? Number(oldItem.min) + 1 : Number(oldItem.min),
      };
      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const addItem = (text, min, sec) => {
    const newItem = createItem(text, min, sec);
    setTodoData((data) => [...data, newItem]);
  };

  const todoCount = todoData.filter((el) => !el.done).length;

  const visibleItems = filterTodo();

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onTogglePlay={onTogglePlay}
          updateTimer={updateTimer}
        />
        <Footer
          toDo={todoCount}
          onCLearCompleted={onCLearCompleted}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
}

export default App;
