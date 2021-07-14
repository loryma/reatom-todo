import { declareAtom, combine } from '@reatom/core';
import { useAtom } from "@reatom/react";
import { addTodoAction, AddTodo } from './AddTodo';
import Todo from './Todo';
import { VisibilityFilteredAtom, VISIBILITY_FILTERS } from './VisibilityFilters';
import VisibilityFilter from './VisibilityFilters';

export const todosAtom = declareAtom(
  'todosList', 
  {}, // initial state
  on => [
    // reducers definitions:
    // `on(dependedDeclaredActionOrAtom, reducer)`
    // reducer: (oldState, dependedValues) => newState
    on(addTodoAction, (state, { id, value, completed }) => ({...state, [id]: { value, completed } })),
  ],
);

const todosIdsAtom = declareAtom(
  'todosIdsAtom',
  [],
  on => on(addTodoAction, (state, { id }) => [...state, id]),
);

export const TodosIdsFilteredAtom = declareAtom(
  "todosIdsVisible", // name
  [], // initial state
  on =>
    on(
      combine([todosIdsAtom, todosAtom, VisibilityFilteredAtom]),
      (state, [ids, todos, filter]) => {
        switch (filter) {
          case VISIBILITY_FILTERS.COMPLETED:
            return ids.filter(id => todos[id].completed)
          case VISIBILITY_FILTERS.INCOMPLETE:
            return ids.filter(id => !todos[id].completed)
          case VISIBILITY_FILTERS.ALL:
          default:
            return ids
        }
      }
    )
)

function TodoList() {
  const todos = useAtom(TodosIdsFilteredAtom);
  return (
    <div>
      <AddTodo />
      <ul>
        {todos.map((id) => <Todo key={id} id={id} />)}
      </ul>
      <VisibilityFilter />
    </div>
  )
};

export default TodoList;