import { useEffect, useState } from 'react';
import { convertDatetimeLocalToISOString } from '../helpers/date.helpers';
import {
  CreateTodoInputPayload,
  createTodoItem,
  deleteTodoItem,
  editTodoItem,
} from '../helpers/todo.helpers';
import { Todo } from '../models/Todo';

type Options = {
  onCreated?: () => void;
  onUpdated?: () => void;
  onRemoved?: () => void;
};

export const useTodoCrud = (
  loadedData: Todo[],
  { onCreated, onRemoved, onUpdated }: Options = {}
) => {
  const [data, setData] = useState<Todo[]>(loadedData);

  useEffect(() => {
    if (loadedData != null && loadedData.length > 0) {
      setData(loadedData);
    }
  }, [loadedData]);

  const create = (item: CreateTodoInputPayload) => {
    createTodoItem({
      ...item,
      completed: false,
      deadline: convertDatetimeLocalToISOString(item.deadline),
    })
      .then((todo) => {
        setData([todo, ...data]);
        onCreated?.();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const update = (item: Todo) => {
    const index = data.findIndex((i) => i.id === item.id);
    const newData = [...data];
    newData[index] = item;
    setData(newData);

    editTodoItem(item)
      .then(() => onUpdated?.())
      .catch((error) => {
        alert(error);
      });
  };

  const remove = (id: number) => {
    setData(data.filter((item) => item.id !== id));

    deleteTodoItem(id)
      .then(() => {
        onRemoved?.();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return { data, create, update, remove };
};
