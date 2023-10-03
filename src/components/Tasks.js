import { Fragment } from "react";
import Task from "./Task";

function Tasks({ tasks, handleDelete, handleToggleReminder, handleRestore }) {
  return (
    <Fragment>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          handleDelete={handleDelete}
          handleToggleReminder={handleToggleReminder}
          handleRestore={handleRestore}
        />
      ))}
    </Fragment>
  );
}

export default Tasks;
