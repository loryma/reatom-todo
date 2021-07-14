import './App.css';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';
import TodoList from './components/TodoList';

function App() {
  const store = createStore();

  return (
    <div className="App">
      <context.Provider value={store}>
        <TodoList />
      </context.Provider>
    </div>
  );
}

export default App;
