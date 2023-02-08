import { Todo } from '../../models/Todo';
import { VStack } from '../common';
import { TodoRow } from './todo-row';

type Props = {
  todos: Todo[];
  className?: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoList = ({ todos, className, onToggle, onDelete }: Props) => {
  return (
    <VStack className={className}>
      {todos.map((todo) => (
        <TodoRow
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  );
};
