
import React, { useState } from "react"
import { declareAction } from '@reatom/core';
import { useAction } from "@reatom/react";
import { Form, Input, Button } from 'antd';


let nextTodoId = Math.random()
function getId() {
  return (++nextTodoId).toString(36)
}

const _addTodo = declareAction("addTodoAction")

export const addTodoAction = Object.assign(
  value =>
    _addTodo({
      id: getId(),
      value,
      completed: false,
    }),
  _addTodo
)

export function AddTodo() {
  const [input, setInput] = useState('');
  const [form] = Form.useForm();
  const handleSubmit = useAction(
    value => {
      if (value.todo.length !== 0) {
        const newValue = value.todo;
        setInput('');
        return addTodoAction(newValue);
      } 
    },
    []
  );

  const handleChange = (value) => setInput(value);

  return (
    <Form 
      form={form}
      layout='inline'
      onFinish={handleSubmit}
      fields={[
        {
          name: [
            'todo'
          ],
          value: input,
        }
      ]}
      onFieldsChange={(_, allFields) => {
        handleChange(allFields[0].value);
      }}
    >
      <Form.Item
        name='todo'
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  )
}