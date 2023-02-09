import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '../../components/common';
import { Avatar } from '../../components/common/avatar';
import { Tag } from '../../components/common/tag';
import { useFetch } from '../../hooks';
import { Todo } from '../../models/Todo';

const TodoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useFetch<Todo>(
    `${import.meta.env.VITE_API_URL}/todo/${id}`,
    `We could not find the todo you are looking for.`
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data == null) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-1/2 mx-auto my-10 space-y-3">
      <HStack spacing={1} align="center">
        <Avatar
          size="sm"
          rounded="full"
          imgSrc={data.avatar}
          alt="User profile picture"
        />
        <Text>{data.name}</Text>
      </HStack>
      <Heading size="xl">{data.title}</Heading>
      <Text color="gray">{data.description}</Text>
      {data.completed ? (
        <Tag label="Completed" color="primary" size="lg" />
      ) : (
        <Tag label="Still not completed :/" color="secondary" size="lg" />
      )}
      <HStack spacing={1}>
        {data.tags?.map((tag) => (
          <Tag label={tag} key={tag} size="md" />
        ))}
      </HStack>

      <HStack spacing={1}>
        <div className="grow"></div>
        <Button colorScheme="ghost" onClick={() => navigate(-1)}>
          Get Back
        </Button>
        <Button onClick={() => navigate(`/${id}/edit`)}>Edit</Button>
      </HStack>
    </div>
  );
};

export default TodoDetailPage;
