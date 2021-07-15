import { declareAction } from '@reatom/core';
import { useAtom, useAction } from "@reatom/react";
import { todosAtom } from './TodoList';
import { Typography, Checkbox, Button, Tooltip, Space } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

export const toggleCompletedAction = declareAction('toggleCompletedAction');
export const deleteTodoItemAction = declareAction('deleteTodoItemAction')

function Todo({ id }) {
  const todoItem = useAtom(todosAtom, state => state[id]);
  const handleToggleComplete = useAction(
    e => toggleCompletedAction({ id }),
    [id]
  );

  const handleDeleteTodo = useAction(
    e => deleteTodoItemAction({ id }),
    [id]
  );

  if (!todosAtom) return null;

  return (
    <Space>
      <Checkbox
        checked={todoItem.completed}
        onChange={handleToggleComplete}
      >
      </Checkbox> {todoItem.value}
      <Tooltip title="delete">
        <Button type="danger" onClick={handleDeleteTodo} shape="circle" icon={<DeleteFilled />} />
      </Tooltip>
    </Space>
  );
};

export default Todo;