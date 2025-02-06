export type TaskType = {
  id: number;
  title: string;
  completed: boolean;
};

export interface TodoListProps {
  tasks: TaskType[];
  toggleTaskCompletion: (taskId: number) => void;
  handleTaskUpdate: (task: TaskType) => void;
  handleTaskDelete: (taskId: number) => void;
}

export interface TaskFormProps {
  addTask: (taskTitle: string) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
}
