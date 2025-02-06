import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TaskForm from "./TaskForm";
import { TaskType } from "../interfaces/TodoListProps";

const Home = () => {
  const url = "https://jsonplaceholder.typicode.com/todos"; // TODO: switch to backend api
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Fetch all tasks
  const getTasks = async () => {
    try {
      const res = await fetch(`${url}?_limit=3`);
      const task: TaskType[] = await res.json();
      setTasks(task);
      setIsPending(false);
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
    }
  };

  // Create a new task
  const addTask = async (taskTitle: string) => {
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      completed: false,
    };
    try {
      const res = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers,
      });
      const task: TaskType = await res.json();
      setTasks([...tasks, task]);
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
    }
  };

  // Update a task
  const updateTask = async (updatedTask: TaskType) => {
    const newTitle = window.prompt("Title: ", updatedTask.title);
    if (newTitle === null || newTitle.trim() === "") return;

    try {
      const res = await fetch(`${url}/${updatedTask.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: newTitle,
        }),
        headers,
      });

      const { title }: TaskType = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, title } : task
        )
      );
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks?.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    await fetch(`${url}/${taskId}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {tasks && <TaskForm addTask={addTask} />}
      {tasks && (
        <TodoList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          handleTaskUpdate={updateTask}
          handleTaskDelete={deleteTask}
        />
      )}
    </div>
  );
};
export default Home;
