
import React, { useState } from "react"
import { declareAction } from '@reatom/core';
import { useAction } from "@reatom/react";
import { Form, Input, Button } from 'antd';

export const editTodoItemAction = declareAction('editTodoItemAction');

function EditTodo({ initial, id, setEditMode }) {
  const [input, setInput] = useState(initial);
  const [form] = Form.useForm();
  const handleSubmit = useAction(
    value => {
      setEditMode(false);
      if (value?.todoItem?.length !== 0) return editTodoItemAction({ id, value: value.todoItem });
    },
    [id]
  );

  const handleChange = async (value) => {
    setInput(value);
  };

  return (
    <Form 
      form={form}
      layout='inline'
      onFinish={handleSubmit}
      fields={[
        {
          name: [
            'todoItem'
          ],
          value: input,
        }
      ]}
      onFieldsChange={(_, allFields) => {
        handleChange(allFields[0].value);
      }}
    >
      <Form.Item
        name='todoItem'
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type='default' htmlType='submit'>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
};

export default EditTodo;


