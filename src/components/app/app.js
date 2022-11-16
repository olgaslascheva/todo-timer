import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createItem("Task 1", "November 8, 2022 03:24:00"),
      this.createItem("Task 2", "November 9, 2022 05:25:00"),
      this.createItem("Task 3", "November 10, 2022 13:06:00"),
    ],
    filterValue: "all",
  };

  filterTodo = () => {
    const { todoData, filterValue } = this.state;

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

  onFilterChange = (filterValue) => {
    this.setState({ filterValue });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  onCLearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.done);

      return {
        todoData: newArray,
      };
    });
  };

  createItem(description, time = Date.now()) {
    this.maxId += 1;
    return {
      description,
      done: false,
      time: formatDistanceToNow(new Date(time)),
      id: this.maxId,
    };
  }

  render() {
    const { todoData, filterValue } = this.state;
    const todoCount = todoData.filter((el) => !el.done).length;

    const visibleItems = this.filterTodo();

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList todos={visibleItems} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
          <Footer
            toDo={todoCount}
            onCLearCompleted={this.onCLearCompleted}
            filterValue={filterValue}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}
