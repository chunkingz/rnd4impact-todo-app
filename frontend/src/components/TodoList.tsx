import { TodoListProps } from "../interfaces/TodoListProps";
import TodoItem from "./TodoItem";

const TodoList = ({
  tasks,
  toggleTaskCompletion,
  handleTaskUpdate,
  handleTaskDelete,
}: TodoListProps) => {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          handleTaskUpdate={handleTaskUpdate}
          handleTaskDelete={handleTaskDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
