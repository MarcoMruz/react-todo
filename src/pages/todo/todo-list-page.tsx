import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button, Heading, Input } from '../../components/common';
import { FloatingButton } from '../../components/common/floating-button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../../components/common/modal';
import { TodoList } from '../../components/todo';
import { FormValues, TodoForm } from '../../components/todo/todo-form';
import { useDisclosure } from '../../hooks/use-disclosure';
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
  completed: false,
  tags: [],
};

const TodoListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { close, isOpen, open } = useDisclosure();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    submitForm,
  } = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    validateOnMount: false,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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

  const handleOnSearchTermChange = (
    searchTerm: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(searchTerm.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data == null) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto w-1/2">
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Currently adding TODO</ModalHeader>
          <ModalBody>
            <TodoForm
              values={values}
              errors={errors}
              onChange={handleChange}
              onSetFieldValue={setFieldValue}
              onSubmit={handleSubmit}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="ghost" onClick={close}>
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

      <div className="py-5">
        <Input
          value={searchTerm}
          onChange={handleOnSearchTermChange}
          placeholder="What are you looking for?"
        />
      </div>

      <TodoList
        todos={data}
        onDelete={handleOnDelete}
        onToggle={handleOnToggle}
        onEdit={(id) => navigate(`/${id}/edit`)}
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
