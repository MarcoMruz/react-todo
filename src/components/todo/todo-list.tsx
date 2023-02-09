import { memo } from 'react';
import { Todo } from '../../models/Todo';
import { VStack } from '../common';
import { TodoRow } from './todo-row';

type Props = {
  todos: Todo[];
  className?: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onDetailClick: (id: number) => void;
};

export const TodoList = memo(
  ({ todos, className, onToggle, onDelete, onEdit, onDetailClick }: Props) => {
    return (
      <VStack className={className} spacing={5}>
        {todos.map((todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onDetailClick={onDetailClick}
          />
        ))}
      </VStack>
    );
  }
);
