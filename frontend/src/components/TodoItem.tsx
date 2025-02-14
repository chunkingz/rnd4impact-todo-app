import { TaskType } from "../interfaces/TodoListProps";

interface TodoItemProps {
  task: TaskType;
  toggleTaskCompletion: (taskId: number) => void;
  handleTaskUpdate: (task: TaskType) => void;
  handleTaskDelete: (taskId: number) => void;
}

const TodoItem = ({
  task,
  toggleTaskCompletion,
  handleTaskUpdate,
  handleTaskDelete,
}: TodoItemProps) => {
  const handleComplete = () => {
    toggleTaskCompletion(task.id);
  };

  const handleUpdate = () => {
    handleTaskUpdate(task);
  };

  const handleDelete = () => {
    handleTaskDelete(task.id);
  };

  return (
    <div className="task-preview">
      <h2 onClick={handleUpdate}>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>
        <i>Completed: {task.completed ? "Yes" : "No"}</i>
      </p>
      <button onClick={handleComplete} id="updateBtn">
        Mark as completed
      </button>
      &nbsp;
      <button onClick={handleDelete} id="deleteBtn">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
