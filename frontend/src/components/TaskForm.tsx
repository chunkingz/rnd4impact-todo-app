import { TaskFormProps } from "../interfaces/TodoListProps";

const TaskForm = ({ addTask }: TaskFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskTitle = formData.get("task") as string;
    if (taskTitle.trim() === "") return;
    addTask(taskTitle);
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <label htmlFor="">
        <input type="text" name="task" placeholder="Enter a task" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
