import { useState } from 'react';
import { Todo } from '../models/Todo';

export const useCrud = <T extends { id: number }>() => {
  const [data, setData] = useState<T[]>([]);

  const create = (item: T) => {
    setData([...data, item]);
  };

  const update = (item: T) => {
    const index = data.findIndex((i) => i.id === item.id);
    const newData = [...data];
    newData[index] = item;
    setData(newData);
  };

  const remove = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return { data, create, update, remove };
};
