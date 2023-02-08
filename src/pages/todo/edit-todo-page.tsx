import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormValues, TodoForm } from '../../components/todo/todo-form';
import useFetch from '../../hooks/use-fetch';
import { Todo } from '../../models/Todo';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().notRequired(),
  deadline: yup.date().notRequired(),
  tags: yup.array().of(yup.string()).notRequired(),
  completed: yup.boolean().notRequired(),
});

const INITIAL_VALUES: FormValues = {
  title: '',
  description: '',
  deadline: '',
  tags: [],
  completed: false,
};

const EditTodo = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useFetch<Todo>(
    `${import.meta.env.VITE_API_URL}/todos/${id}`,
    'We could not find the todo you are looking for.'
  );
  const {
    errors,
    values,
    handleSubmit,
    resetForm,
    handleChange,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: data || INITIAL_VALUES,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnMount: false,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data == null) {
    return <div>{error}</div>;
  }

  return (
    <TodoForm
      errors={errors}
      onChange={handleChange}
      onSetFieldValue={setFieldValue}
      onSubmit={handleSubmit}
      onReset={resetForm}
      values={values}
    />
  );
};

export default EditTodo;
