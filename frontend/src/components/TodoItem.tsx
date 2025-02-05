import { TaskType } from "../interfaces/TodoListProps";

interface TodoItemProps {
    task: TaskType;
    toggleTaskCompletion: (taskId: number) => void;
    handleTaskUpdate: (task: TaskType) => void;
}

const TodoItem = ({task, toggleTaskCompletion, handleTaskUpdate}: TodoItemProps) => {
    
    const handleComplete = () => {
        toggleTaskCompletion(task.id);
    }

    const handleUpdate = () => {
        handleTaskUpdate(task);
    }

    return (
        <div className="task-preview">
            <h2 onClick={handleUpdate}>{task.title}</h2>
            <p>Completed: {task.completed ? 'Yes' : 'No'} &nbsp;
            <button onClick={handleComplete} id="updateBtn">update</button>
            </p>
        </div>
    );
}

export default TodoItem;
