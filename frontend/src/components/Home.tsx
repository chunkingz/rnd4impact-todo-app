import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TaskForm from "./TaskForm";
import { TaskType } from "../interfaces/TodoListProps";

const Home = () => {
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=3"; // TODO: switch to backend api
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  const addTask = (taskTitle: string) => {
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: TaskType) => {
    const newTitle = window.prompt("Title: ", updatedTask.title);
    if(newTitle) {
      setTasks((prevTasks) => 
        prevTasks.map((task) => 
          (task.id === updatedTask.id ? {...task, title: newTitle} : task)));
    }
  }

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks?.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((task) => {
        setIsPending(false);
        setTasks(task);
      });
  }, []);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {tasks && <TaskForm addTask={addTask} />}
      {tasks && (
        <TodoList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} handleTaskUpdate={updateTask} />
      )}
    </div>
  );
};
export default Home;
