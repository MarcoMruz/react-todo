import { Todo } from '../../models/Todo';
import { VStack } from '../common';
import { TodoRow } from './todo-row';

type Props = {
  todos: Todo[];
  className?: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export const TodoList = ({
  todos,
  className,
  onToggle,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <VStack className={className} spacing={5}>
      {todos.map((todo) => (
        <TodoRow
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </VStack>
  );
};
