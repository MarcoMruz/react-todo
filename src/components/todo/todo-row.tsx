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
    <HStack
      align="center"
      spacing={5}
      className={`todo-row ${
        completed ? 'bg-green-300' : ''
      } my-5 border border-slate-400 p-5`}
      shadow="md"
      rounded="md"
    >
      <Checkbox
        isChecked={completed}
        onChange={() => onToggle(id)}
        size="md"
        disabled
      />
      <VStack>
        <Heading size="lg">{title}</Heading>
        <Text color="green">{description}</Text>
      </VStack>

      <Spacer />

      <Button onClick={() => onDelete(id)}>Delete</Button>
      <button className="btn btn-accent btn-outline">skap</button>
    </HStack>
  );
};
