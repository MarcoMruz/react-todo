import { Container } from '../../components/common';
import { TodoList } from '../../components/todo';
import useFetch from '../../hooks/use-fetch';
import { Todo } from '../../models/Todo';

const TodoListPage = () => {
  const { data, error, loading } = useFetch<Todo[]>(
    `${import.meta.env.VITE_API_URL}/todo`,
    'We could not find the todos you are looking for.'
  );

  const handleOnDelete = (id: number) => {
    console.log('Delete', id);
  };

  const handleOnToggle = (id: number) => {
    console.log('Toggle', id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data == null) {
    return <div>{error}</div>;
  }

  return (
    <>
      <p className="text-blue-500 font-thin text-4xl text-center py-10">
        Welcome to TODO app!
      </p>

      <TodoList
        todos={data}
        className="w-1/2 mx-auto"
        onDelete={handleOnDelete}
        onToggle={handleOnToggle}
      />
    </>
  );
};

export default TodoListPage;
