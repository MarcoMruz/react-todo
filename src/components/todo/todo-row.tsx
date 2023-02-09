import { Link } from 'react-router-dom';
import { formatStringDateForDisplayWithTime } from '../../helpers/date.helpers';
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
  onEdit: (id: number) => void;
};

export const TodoRow = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const { id, completed, title, deadline, description } = todo;

  return (
    <HStack
      align="center"
      spacing={5}
      className={`todo-row ${
        completed ? 'bg-green-300' : ''
      } my-5 border border-slate-400 p-5 w-full`}
      shadow="md"
      rounded="md"
    >
      <Checkbox isChecked={completed} onChange={() => onToggle(id)} size="lg" />
      <VStack>
        <Link to={`/${id}`}>
          <Heading size="lg">{title}</Heading>
        </Link>
        <Text color="slate">{description}</Text>
        <Text color="gray" size="xs">
          {formatStringDateForDisplayWithTime(deadline)}
        </Text>
      </VStack>

      <Spacer />

      <Button onClick={() => onEdit(id)}>Edit</Button>
      <Button onClick={() => onDelete(id)} colorScheme="danger">
        Delete
      </Button>
    </HStack>
  );
};
