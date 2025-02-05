import {TodoListProps} from "../interfaces/TodoListProps";
import TodoItem from "./TodoItem";

const TodoList = ({tasks, toggleTaskCompletion, handleTaskUpdate}: TodoListProps) => {
    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} handleTaskUpdate={handleTaskUpdate} />
            ))}
        </div>
    )
}

export default TodoList;