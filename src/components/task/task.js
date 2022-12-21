import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
  };

  interval = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isCounting, updateTimer } = this.props;
    if (prevProps.isCounting !== isCounting) {
      if (isCounting) {
        this.interval = setInterval(updateTimer, 1000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  render() {
    const { onToggleDone, onDeleted, onTogglePlay, title, time, min, sec, isCounting } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="title">{title}</span>
          <span className="description">
            {isCounting ? (
              <button type="button" aria-label="Pause" className="icon icon-pause" onClick={onTogglePlay} />
            ) : (
              <button type="button" aria-label="Play" className="icon icon-play" onClick={onTogglePlay} />
            )}
            {min < 10 && String(min).length !== 2 ? `0${min}` : min}:
            {sec < 10 && String(sec).length !== 2 ? `0${sec}` : sec}
          </span>
          <span className="description"> created {time} ago </span>
        </label>
        <button type="button" aria-label="Edit" className="icon icon-edit" />
        <button type="button" aria-label="Delete" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}
