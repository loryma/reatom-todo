import { useAtom } from "@reatom/react";
import { todosAtom } from './TodoList';

function Todo({ id }) {
  const todoItem = useAtom(todosAtom, state => state[id]);

  if (!todosAtom) return null;

  return (
    <li>
      {todoItem.value}
    </li>
  );
};

export default Todo;