import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  convertDatetimeLocalToISOString,
  convertISOStringToDatetimeLocal,
} from '../../helpers/date.helpers';
import { Button, HStack, Spacer } from '../common';
import { FormValues, TodoForm } from './todo-form';

type Props = {
  data: FormValues;
  onSubmit: (values: FormValues) => void;
  onBackClick?: () => void;
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().notRequired(),
  deadline: yup.date().notRequired(),
  tags: yup.array().of(yup.string()).notRequired(),
  completed: yup.boolean().notRequired(),
});

export const EditTodoForm = ({ data, onSubmit, onBackClick }: Props) => {
  const {
    errors,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    submitForm,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      ...data,
      deadline: convertISOStringToDatetimeLocal(data.deadline),
    },
    validationSchema,
    onSubmit: (values) => {
      const newTodo = {
        ...values,
        deadline: convertDatetimeLocalToISOString(values.deadline),
      };
      console.log(values, newTodo);
      onSubmit(newTodo);
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <TodoForm
        errors={errors}
        values={values}
        onChange={handleChange}
        onSetFieldValue={setFieldValue}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <HStack spacing={1}>
        <Spacer />

        {onBackClick && (
          <Button
            colorScheme="ghost"
            onClick={onBackClick}
            disabled={isSubmitting}
          >
            Get Back
          </Button>
        )}
        <Button onClick={submitForm} disabled={isSubmitting}>
          Submit
        </Button>
      </HStack>
    </>
  );
};
