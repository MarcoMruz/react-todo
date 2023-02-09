import { useEffect, useReducer, useState } from 'react';
import { Todo } from '../models/Todo';

export enum FilterActionType {
  SEARCH = 'SEARCH',
  ONLY_COMPLETED = 'ONLY_COMPLETED',
  ONLY_UNCOMPLETED = 'ONLY_UNCOMPLETED',
  DEADLINE = 'DEADLINE',
  ALL = 'ALL',
}

export type FilterState = {
  search: string;
  onlyCompleted: boolean;
  onlyUncompleted: boolean;
  deadline: 'asc' | 'desc';
  all: boolean;
};

export type FilterAction = {
  type: FilterActionType;
  payload: string | boolean;
};

export const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case FilterActionType.SEARCH:
      return {
        ...state,
        search: action.payload as string,
      };
    case FilterActionType.ONLY_COMPLETED:
      return {
        ...state,
        onlyCompleted: action.payload as boolean,
      };
    case FilterActionType.ONLY_UNCOMPLETED:
      return {
        ...state,
        onlyUncompleted: action.payload as boolean,
      };
    case FilterActionType.DEADLINE:
      return {
        ...state,
        deadline: action.payload as 'asc' | 'desc',
      };
    case FilterActionType.ALL:
      return {
        ...state,
        all: action.payload as boolean,
      };
    default:
      return state;
  }
};

type UseFilterReturnType = [
  FilterState,
  {
    showAll: () => void;
    showOnlyCompleted: () => void;
    showOnlyUncompleted: () => void;
    sortByDeadline: () => void;
    handleOnSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnClear: () => void;
  }
];

const INITIAL_STATE: FilterState = {
  search: '',
  onlyCompleted: false,
  onlyUncompleted: false,
  deadline: 'asc',
  all: true,
};

export const useFilter = (
  initialState: FilterState = INITIAL_STATE
): UseFilterReturnType => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const showAll = () => {
    dispatch({ type: FilterActionType.ALL, payload: true });
    dispatch({ type: FilterActionType.ONLY_COMPLETED, payload: false });
    dispatch({ type: FilterActionType.ONLY_UNCOMPLETED, payload: false });
    dispatch({ type: FilterActionType.DEADLINE, payload: 'asc' });
  };

  const showOnlyCompleted = () => {
    dispatch({ type: FilterActionType.ALL, payload: false });
    dispatch({ type: FilterActionType.ONLY_COMPLETED, payload: true });
    dispatch({ type: FilterActionType.ONLY_UNCOMPLETED, payload: false });
    dispatch({ type: FilterActionType.DEADLINE, payload: 'asc' });
  };

  const showOnlyUncompleted = () => {
    dispatch({ type: FilterActionType.ALL, payload: false });
    dispatch({ type: FilterActionType.ONLY_COMPLETED, payload: false });
    dispatch({ type: FilterActionType.ONLY_UNCOMPLETED, payload: true });
    dispatch({ type: FilterActionType.DEADLINE, payload: 'asc' });
  };

  const sortByDeadline = () => {
    dispatch({ type: FilterActionType.ALL, payload: false });

    if (state.deadline === 'asc') {
      dispatch({ type: FilterActionType.DEADLINE, payload: 'desc' });
    } else {
      dispatch({ type: FilterActionType.DEADLINE, payload: 'asc' });
    }
  };

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FilterActionType.SEARCH, payload: e.target.value });
  };

  const handleOnClear = () => {
    dispatch({ type: FilterActionType.SEARCH, payload: '' });
    dispatch({ type: FilterActionType.ALL, payload: true });
    dispatch({ type: FilterActionType.ONLY_COMPLETED, payload: false });
    dispatch({ type: FilterActionType.ONLY_UNCOMPLETED, payload: false });
    dispatch({ type: FilterActionType.DEADLINE, payload: 'asc' });
  };

  return [
    state,
    {
      showAll,
      showOnlyCompleted,
      showOnlyUncompleted,
      sortByDeadline,
      handleOnSearchChange,
      handleOnClear,
    },
  ];
};
