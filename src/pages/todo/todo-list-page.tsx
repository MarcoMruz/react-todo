import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button, Heading } from '../../components/common';
import { FloatingButton } from '../../components/common/floating-button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../../components/common/modal';
import { TodoList, TodoSearchbar, TodoForm } from '../../components/todo';
import { FormValues } from '../../components/todo/todo-form';
import {
  convertDatetimeLocalToISOString,
  convertISOStringToDatetimeLocal,
} from '../../helpers/date.helpers';
import { useFetch, useTodoCrud, useFilter, useDisclosure } from '../../hooks';
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
  completed: false,
  tags: [],
};

const TodoListPage = () => {
  const { data, error, loading } = useFetch<Todo[]>(
    `${import.meta.env.VITE_API_URL}/todo`,
    'We could not find the todos you are looking for.'
  );
  const {
    data: todos,
    create,
    remove,
    update,
  } = useTodoCrud(data || [], {
    onCreated: () => {
      close();
      resetForm();
    },
  });
  const [filterState, filterActionHandlers] = useFilter();

  const navigate = useNavigate();
  const { close, isOpen, open } = useDisclosure();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    submitForm,
    resetForm,
  } = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newTodo = {
        ...values,
        deadline: convertDatetimeLocalToISOString(values.deadline),
      };
      console.log(values, newTodo);
      create(newTodo);
    },
  });

  useEffect(() => {
    const eventListener = (e: any) => {
      if (e.key === 'a' && e.ctrlKey) {
        open();
      }
    };

    window.addEventListener('keydown', eventListener);

    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, [open]);

  const handleOnDelete = (id: number) => {
    remove(id);
  };

  const handleOnToggle = (todoId: number) => {
    const todo = todos.find(({ id }) => id === todoId);

    if (todo != null) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      update({ ...updatedTodo });
    }
  };

  const handleOnClose = () => {
    close();
    resetForm();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data == null) {
    return <div>{error}</div>;
  }

  const filteredTodos = todos
    .filter((todo) => {
      const { search } = filterState;

      if (search == null) {
        return true;
      } else {
        return (
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description?.toLowerCase().includes(search.toLowerCase())
        );
      }
    })
    .filter((todo) => {
      const { onlyCompleted } = filterState;

      if (onlyCompleted) {
        return todo.completed;
      }

      return true;
    })
    .filter((todo) => {
      const { onlyUncompleted } = filterState;

      if (onlyUncompleted) {
        return !todo.completed;
      }

      return true;
    })
    .sort((a, b) => {
      const { deadline } = filterState;

      if (deadline === 'asc') {
        return dayjs(a.deadline).diff(dayjs(b.deadline));
      } else if (deadline === 'desc') {
        return dayjs(b.deadline).diff(dayjs(a.deadline));
      }

      return 0;
    });

  return (
    <div className="mx-auto w-1/2">
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        position="center"
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Currently adding TODO</ModalHeader>
          <ModalBody>
            <TodoForm
              values={{
                ...values,
                deadline: convertISOStringToDatetimeLocal(values.deadline),
              }}
              errors={errors}
              onChange={handleChange}
              onSetFieldValue={setFieldValue}
              onSubmit={handleSubmit}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="ghost" onClick={handleOnClose}>
              Close
            </Button>
            <Button onClick={submitForm}>Add TODO</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading
        size="5xl"
        align="center"
        color="blue"
        weight="thin"
        className="py-2"
      >
        Welcome to TODO app!
      </Heading>

      <TodoSearchbar
        className="py-5"
        onClear={filterActionHandlers.handleOnClear}
        onSearchChange={filterActionHandlers.handleOnSearchChange}
        onSortByDeadline={filterActionHandlers.sortByDeadline}
        onToggleAll={filterActionHandlers.showAll}
        onToggleCompleted={filterActionHandlers.showOnlyCompleted}
        onToggleUncompleted={filterActionHandlers.showOnlyUncompleted}
        searchTerm={filterState.search}
      />

      <TodoList
        todos={filteredTodos}
        onDelete={handleOnDelete}
        onToggle={handleOnToggle}
        onEdit={(id) => navigate(`/${id}/edit`)}
        onDetailClick={(id) => navigate(`/${id}`)}
      />

      <FloatingButton
        variant="circle"
        colorScheme="info"
        shadow="lg"
        size="lg"
        onClick={open}
      >
        Add
      </FloatingButton>
    </div>
  );
};

export default TodoListPage;
