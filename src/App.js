import { useEffect } from 'react';
import './App.css';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';
import TodoList from './components/TodoList';
import { connectReduxDevtools } from "@reatom/debug";

const store = createStore(
  undefined,
  JSON.parse(localStorage.getItem("app_store")) || {}
);

function App() {

  useEffect(() => {
    return connectReduxDevtools(store)
  });

  useEffect(() => {
    return store.subscribe(() =>
      localStorage.setItem("app_store", JSON.stringify(store.getState()))
    )
  })


  return (
    <div className="App">
      <context.Provider value={store}>
        <TodoList />
      </context.Provider>
    </div>
  );
}

export default App;
