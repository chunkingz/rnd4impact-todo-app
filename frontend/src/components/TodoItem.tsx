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
      <p>
        <i>Completed: {task.completed ? "Yes" : "No"}</i> &nbsp;
        <button onClick={handleComplete} id="updateBtn">
          update
        </button>
        &nbsp;
        <button onClick={handleDelete} id="deleteBtn">
          delete
        </button>
      </p>
    </div>
  );
};

export default TodoItem;
