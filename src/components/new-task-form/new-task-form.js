import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  };

  state = {
    label: "",
    min: "",
    sec: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({ min: !(/\D/.test(e.target.value) || e.target.value > 59) ? e.target.value : "" });
  };

  onSecChange = (e) => {
    this.setState({ sec: !(/\D/.test(e.target.value) || e.target.value > 59) ? e.target.value : "" });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { onItemAdded } = this.props;
    const { label, min, sec } = this.state;
    onItemAdded(label, min, sec);

    this.setState({
      label: "",
      min: "",
      sec: "",
    });
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input className="new-todo" placeholder="Task" onChange={this.onLabelChange} value={label} />
          <input className="new-todo-form__timer" placeholder="Min" onChange={this.onMinChange} value={min} />
          <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecChange} value={sec} />
          <input type="submit" className="new-todo-form__timer" value="" style={{ width: 0, padding: 0 }} />
        </form>
      </header>
    );
  }
}
