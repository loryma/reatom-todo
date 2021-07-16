import { useEffect } from 'react';
import './App.css';
import { createStore, combine } from '@reatom/core';
import { context } from '@reatom/react';
import Home from './components/Home';
import { connectReduxDevtools } from "@reatom/debug";
import { todosAtom, todosIdsAtom, todosIdsVisible } from './components/TodoList';

const shapeAtom = combine({
  todosAtom, todosIdsAtom, todosIdsVisible
});


function App() {

  const store = createStore(
    shapeAtom,
    JSON.parse(localStorage.getItem("app_store")) || {}
  );

  console.log(localStorage.getItem("app_store"))
    

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
        <Home />
      </context.Provider>
    </div>
  );
}

export default App;
