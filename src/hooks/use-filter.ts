import { useReducer, useState } from 'react';
import { Todo } from '../models/Todo';

type UseFilterReturnType<T extends Omit<Todo, 'id'>> = {
  data: T[];
  count: number;
  sortBy: (key: keyof T) => void;
  filterBy: (key: keyof T, value: string) => void;
};

export const useFilter = <T extends Omit<Todo, 'id'>>(
  data: T[]
): UseFilterReturnType<T> => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [count, setCount] = useState<number>(data.length);

  const sortBy = (key: keyof T) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const filterBy = (key: keyof T, value: string | boolean) => {
    const filteredData = data.filter((item) => {
      if (typeof value === 'string') {
        // @ts-ignore
        return item[key].toLowerCase().includes(value.toLowerCase());
      }
      return item[key] === value;
    });
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  return { data: filteredData, count, sortBy, filterBy };
};
