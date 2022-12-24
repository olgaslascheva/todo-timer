import React, { useEffect, useRef } from "react";

import "./task.css";

function Task({ onToggleDone, onDeleted, onTogglePlay, updateTimer, title, time, min, sec, isCounting }) {
  const interval = useRef();

  useEffect(() => {
    if (isCounting) {
      interval.current = setInterval(updateTimer, 1000);
    }
    return () => clearInterval(interval.current);
  }, [isCounting, updateTimer]);

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

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
};

export default Task;
