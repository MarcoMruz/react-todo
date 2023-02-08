import { Todo } from '../../models/Todo';
import {
  Button,
  Checkbox,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '../common';

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoRow = ({ todo, onToggle, onDelete }: Props) => {
  const { id, completed, title, deadline, description } = todo;
  return (
    <HStack className={`todo-row ${completed ? 'bg-green-300' : ''}`}>
      <Checkbox
        isChecked={completed}
        onChange={() => onToggle(id)}
        size="md"
        disabled
      />
      <VStack>
        <Heading size="md">{title}</Heading>
        <Text size="sm" color="gray">
          {description}
        </Text>
      </VStack>

      <Spacer />

      <Button onClick={() => onDelete(id)} color="red">
        Delete
      </Button>
    </HStack>
  );
};
