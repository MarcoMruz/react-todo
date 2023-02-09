import { useNavigate, useParams } from 'react-router-dom';
import { Button, Heading, HStack, Spacer } from '../../components/common';
import { EditTodoForm } from '../../components/todo';
import { FormValues } from '../../components/todo/todo-form';
import { editTodoItem } from '../../helpers/todo.helpers';
import { useFetch } from '../../hooks';
import { Todo } from '../../models/Todo';

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useFetch<Todo>(
    `${import.meta.env.VITE_API_URL}/todo/${id}`,
    'We could not find the todo you are looking for.'
  );

  const handleOnTodoEdit = (values: FormValues) => {
    editTodoItem(values).then(() => {
      navigate(`/`);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data == null) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-1/2 mx-auto my-10">
      <Heading
        size="5xl"
        align="center"
        color="blue"
        weight="thin"
        className="mb-2"
      >
        Currently editing <strong>{data.title}</strong>
      </Heading>

      <EditTodoForm
        data={data}
        onSubmit={(values) => {
          handleOnTodoEdit(values);
        }}
        onBackClick={() => navigate(-1)}
      />
    </div>
  );
};

export default EditTodo;
