import { Todo } from '../models/Todo';

async function createTodoItem(todo: Todo): Promise<Todo> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
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

async function editTodoItem(todo: Todo): Promise<Todo> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/todos/${todo.id}`,
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

async function deleteTodoItem(id: number): Promise<void> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/todos/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Could not delete todo item');
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
