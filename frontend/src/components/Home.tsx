import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TaskForm from "./TaskForm";
import {
  PaginatedTasks,
  TaskType,
  UserCredentialsType,
} from "../interfaces/TodoListProps";
import {
  HEADERS as headers,
  LOGIN_URL,
  TASK_URL,
} from "../utilities/constants";

const Home = () => {
  const [tasks, setTasks] = useState<PaginatedTasks | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("id");
  const [direction, setDirection] = useState<string>("ASC");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [auth, setAuth] = useState<boolean>(false);
  const [userCredentials] = useState<UserCredentialsType | null>(null);

  useEffect(() => {
    if (userCredentials) logIn();
  }, []);

  useEffect(() => {
    if (auth) getTasks();
  }, [auth]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(0);
      getTasks();
    }, 500);
    return () => clearTimeout(delay);
  }, [titleFilter, sortBy, direction, page, size]);

  // Try to login
  const logIn = async () => {
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(userCredentials),
      });

      if (!res.ok) throw new Error("Login failed");

      setAuth(true);
    } catch (e) {
      console.error(`Error logging in: ${e as Error}`);
    }
  };

  //  const logOut = async () => {
  //   try {
  //     const res = await fetch(LOGOUT_URL, {
  //       method: "POST",
  //       credentials: "include",
  //       headers
  //     });

  //     if(!res.ok) throw new Error("Logout failed");

  //     setAuth(true);
  //   } catch (e) {
  //     console.error(`Error logging out: ${e as Error}`);
  //   }
  //  }

  // Fetch all tasks
  const getTasks = async () => {
    try {
      setIsPending(true);

      const res = await fetch(
        `${TASK_URL}?title=${titleFilter}&sortBy=${sortBy}&direction=${direction}&page=${page}&size=${size}`,
        {
          method: "GET",
          credentials: "include",
          headers,
        }
      );

      const tasks: PaginatedTasks = await res.json();

      setTasks(tasks);
      setIsPending(false);
      setSize(10);
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
      setIsPending(false);
    }
  };

  // Create a new task
  const addTask = async (taskTitle: string, taskDescription: string) => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      completed: false,
    };
    try {
      const res = await fetch(`${TASK_URL}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newTask),
        headers,
      });
      const task: TaskType = await res.json();
      setTasks((prevTasks) =>
        prevTasks
          ? { ...prevTasks, content: [...prevTasks.content, task] }
          : {
              content: [task],
              totalPages: 1,
              totalElements: 1,
              size,
              number: 0,
            }
      );
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
    }
  };

  // Update a task
  const updateTask = async (updatedTask: TaskType) => {
    const updatedTitle = prompt("Title: ", updatedTask.title);
    const updatedDescription = prompt("Description: ", updatedTask.description);
    if (!updatedTitle || !updatedDescription) return;

    try {
      const res = await fetch(`${TASK_URL}/${updatedTask.id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
        headers,
      });

      const { title, description }: TaskType = await res.json();

      setTasks((prevTasks) =>
        prevTasks
          ? {
              ...prevTasks,
              content: prevTasks.content.map((task) =>
                task.id === updatedTask.id
                  ? { ...task, title, description }
                  : task
              ),
            }
          : prevTasks
      );
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
    }
  };

  // Set task as completed
  const toggleTaskCompletion = async (taskId: number) => {
    try {
      const res = await fetch(`${TASK_URL}/${taskId}`, {
        method: "PATCH",
        credentials: "include",
        headers,
      });

      await res.json();
      setTasks((prevTasks) =>
        prevTasks
          ? {
              ...prevTasks,
              content: prevTasks.content.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : prevTasks
      );
    } catch (e) {
      console.error(`Error fetching data: ${e as Error}`);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    const userConfirmed = confirm("Are you sure you want to delete this task?");
    if (userConfirmed) {
      try {
        await fetch(`${TASK_URL}/${taskId}`, {
          method: "DELETE",
          credentials: "include",
        });

        setTasks((prevTasks) =>
          prevTasks
            ? {
                ...prevTasks,
                content: prevTasks.content.filter((task) => task.id !== taskId),
              }
            : prevTasks
        );
      } catch (e) {
        console.error(`Error fetching data: ${e as Error}`);
      }
    }
  };

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {tasks && <TaskForm addTask={addTask} />}
      {tasks && (
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="dtCreated">Created Date</option>
            <option value="dtUpdated">Updated Date</option>
          </select>
          <select
            onChange={(e) => setDirection(e.target.value)}
            value={direction}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      )}
      {tasks && (
        <TodoList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          handleTaskUpdate={updateTask}
          handleTaskDelete={deleteTask}
        />
      )}
      {tasks && (
        <div>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            {" "}
            Page {page + 1} of {tasks.totalPages}{" "}
          </span>
          <button
            disabled={page >= tasks.totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default Home;
