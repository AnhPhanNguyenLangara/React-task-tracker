import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Fragment } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const handleShowAdd = () => {
    setShowAddTask(!showAddTask);
  };

  // Add Task

  const handleAdd = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { ...task, id };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Complete Task

  const handleToggleComplete = async (id) => {
    const taskToComplete = await fetchTask(id);
    const updTask = { ...taskToComplete, completed: !taskToComplete.completed };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: data.completed } : task
      )
    );
  };

  // Toggle Reminder

  const handleToggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  return (
    <Router>
      <div className="container">
        <Header handleShowAdd={handleShowAdd} showAdd={showAddTask} />
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                {showAddTask && <AddTask handleAdd={handleAdd} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={incompleteTasks}
                    handleDelete={handleToggleComplete}
                    handleToggleReminder={handleToggleReminder}
                    handleRestore={handleToggleComplete}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </Fragment>
            }
          />
          <Route
            path="/completed"
            element={
              <Fragment>
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={completeTasks}
                    handleDelete={handleDelete}
                    handleToggleReminder={handleToggleReminder}
                    handleRestore={handleToggleComplete}
                  />
                ) : (
                  "No Tasks To Show"
                )}
                <Link to="/">Go Back</Link>
              </Fragment>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
