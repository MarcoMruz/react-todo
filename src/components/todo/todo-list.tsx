import { Todo } from '../../models/Todo';
import { TodoRow } from './todo-row';

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoList = ({ todos, onToggle, onDelete }: Props) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoRow
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
