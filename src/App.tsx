import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/users" element={<h1>Users</h1>} />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
