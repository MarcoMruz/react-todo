import './App.css';
import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/todo/todo-list-page';
import EditTodo from './pages/todo/edit-todo-page';
import TodoDetailPage from './pages/todo/todo-detail-page';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<TodoListPage />} />
        <Route path="/:id/edit" element={<EditTodo />} />
        <Route path="/:id" element={<TodoDetailPage />} />
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
