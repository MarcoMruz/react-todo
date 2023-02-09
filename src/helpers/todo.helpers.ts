import { Todo } from '../models/Todo';

export type CreateTodoInputPayload = {
  title: string;
  description?: string;
  deadline?: string;
  tags?: string[];
  completed?: boolean;
};

export async function createTodoItem(
  todo: CreateTodoInputPayload
): Promise<Todo> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error('Could not create todo item');
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function editTodoItem(todo: Partial<Todo>): Promise<Todo> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/todo/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      }
    );

    if (!response.ok) {
      throw new Error('Could not edit todo item');
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteTodoItem(id: number): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Could not delete todo item');
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export function truncateString(str: string | null = '', num: number): string {
  if (str == null || str.trim() === '') {
    return '';
  }

  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
