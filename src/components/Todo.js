import { declareAction } from '@reatom/core';
import { useAtom, useAction } from "@reatom/react";
import { todosAtom } from './TodoList';
import { Typography, Checkbox } from 'antd';

export const toggleCompletedAction = declareAction('toggleCompletedAction');

function Todo({ id }) {
  const todoItem = useAtom(todosAtom, state => state[id]);
  const handleToggleComplete = useAction(
    e => toggleCompletedAction({ id }),
    [id]
  );

  if (!todosAtom) return null;

  return (
    <>
      <Typography.Text mark>
        <Checkbox
          checked={todoItem.completed}
          onChange={handleToggleComplete}
        >
          </Checkbox>
        </Typography.Text> 
        <Typography.Text>
          {todoItem.value}
        </Typography.Text>
    </>
  );
};

export default Todo;