import { declareAtom, combine } from '@reatom/core';
import { useAtom } from "@reatom/react";
import { addTodoAction, AddTodo } from './AddTodo';
import Todo, { toggleCompletedAction } from './Todo';
import { VisibilityFilteredAtom, VISIBILITY_FILTERS } from './VisibilityFilters';
import VisibilityFilter from './VisibilityFilters';
import { List } from 'antd';

export const todosAtom = declareAtom(
  'todosList', 
  {}, // initial state
  on => [
    // reducers definitions:
    // `on(dependedDeclaredActionOrAtom, reducer)`
    // reducer: (oldState, dependedValues) => newState
    on(addTodoAction, (state, { id, value, completed }) => ({...state, [id]: { value, completed } })),
    on(toggleCompletedAction, (state, { id }) => ({ ...state, [id]: { ...state[id], completed: !state[id].completed }})),
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
    <List
      header={<AddTodo />}
      footer={<VisibilityFilter />}
      bordered
      dataSource={todos}
      renderItem={id => (
        <List.Item>
          <Todo key={id} id={id} />
        </List.Item>
      )}
    />
  )
};

export default TodoList;