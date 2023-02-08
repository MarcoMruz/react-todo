export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  avatar: string;
  tags: string[];
};
