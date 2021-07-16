import { useState } from 'react';
import { declareAction } from '@reatom/core';
import { useAtom, useAction } from "@reatom/react";
import { todosAtom } from './TodoList';
import { Checkbox, Button, Tooltip, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditTodo from './EditTodo';
import './Todo.css';

const { Paragraph, Text } = Typography;

export const toggleCompletedAction = declareAction('toggleCompletedAction');
export const deleteTodoItemAction = declareAction('deleteTodoItemAction');

function Todo({ id }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const todoItem = useAtom(todosAtom, state => state[id]);
  const handleToggleComplete = useAction(
    e => toggleCompletedAction({ id }),
    [id]
  );

  const setEditMode = () => {
    setIsEditMode(state => !state);
  }

  const handleDeleteTodo = useAction(
    e => deleteTodoItemAction({ id }),
    [id]
  );

  if (!todoItem) return null;

  return (
    <Space className="todo">
      <Checkbox
        checked={todoItem.completed}
        onChange={handleToggleComplete}
      >
      </Checkbox> 
      { isEditMode ? 
       (
         <EditTodo id={id} initial={todoItem.value} setEditMode={setEditMode} />
       )
      : 

        <Text ellipsis={true} className="todo__text">
          {todoItem.value}
        </Text>
      }
      <Tooltip title="edit">
        <Button type="primary" onClick={setEditMode} shape="circle" icon={<EditOutlined />} />
      </Tooltip>
      <Tooltip title="delete">
        <Button type="danger" onClick={handleDeleteTodo} shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
    </Space>
  );
};

export default Todo;