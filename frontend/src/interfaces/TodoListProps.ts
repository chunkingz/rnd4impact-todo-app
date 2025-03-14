export type PaginatedTasks = {
  content: TaskType[];
  totalPages: number;
  totalElements?: number;
  size?: number;
  number?: number;
  // pageable: {
  //   pageNumber: number;
  //   pageSize: number;
  //   sort: {
  //     empty: boolean;
  //     unsorted: boolean;
  //     sorted: boolean;
  //   };
  //   offset: number;
  //   unpaged: boolean;
  //   paged: boolean;
  // };
  // last?: boolean;
  // sort: {
  //   empty?: boolean;
  //   unsorted?: boolean;
  //   sorted?: boolean;
  // };
  // numberOfElements?: number;
  // first?: boolean;
  // empty?: boolean;
};

export type TaskType = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export interface TodoListProps {
  tasks: PaginatedTasks;
  toggleTaskCompletion: (taskId: number) => void;
  handleTaskUpdate: (task: TaskType) => void;
  handleTaskDelete: (taskId: number) => void;
}

export interface TaskFormProps {
  addTask: (taskTitle: string, taskDescription: string) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
}

export type UserCredentialsType = {
  username: string,
  password: string
}
