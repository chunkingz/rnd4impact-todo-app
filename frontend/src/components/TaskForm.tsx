import { TaskFormProps } from "../interfaces/TodoListProps";

const TaskForm = ({ addTask }: TaskFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskTitle = formData.get("taskTitle") as string;
    const taskDescription = formData.get("taskDescription") as string;
    if (taskTitle.trim() === "" && taskDescription.trim() === "") return;
    addTask(taskTitle, taskDescription);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <label htmlFor="taskTitle">
        <input type="text" name="taskTitle" placeholder="Enter a task" />
      </label>
      <label htmlFor="taskDescription">
        <textarea name="taskDescription" id="" rows={5} placeholder="Enter a description"></textarea>
      </label>
      <button type="submit" id="addBtn">
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
