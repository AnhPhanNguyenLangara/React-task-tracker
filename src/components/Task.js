import { FaTimes, FaCheck, FaUndo } from "react-icons/fa";

function Task({ task, handleDelete, handleToggleReminder, handleRestore }) {
  const handleClick = () => {
    handleDelete(task.id);
  };

  const handleDoubleClick = () => {
    if (completed) {
      return;
    }
    handleToggleReminder(task.id);
  };

  const handleUndo = () => {
    handleRestore(task.id);
  };

  const completed = task.completed;

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={handleDoubleClick}
    >
      <h3>
        {task.text}

        {completed && (
          <>
            <FaCheck style={{ color: "green" }} />
            <FaUndo style={{ color: "blue" }} onClick={handleUndo} />
          </>
        )}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={handleClick}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
}

export default Task;
