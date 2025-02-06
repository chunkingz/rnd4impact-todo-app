import { ButtonProps } from "../interfaces/TodoListProps";

const Button = ({ children, type = "button" }: ButtonProps) => {
  return <button type={type}> {children} </button>;
};
export default Button;
