
import React, { useState } from "react"
import { declareAction } from '@reatom/core';
import { useAction } from "@reatom/react";


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
  const handleSubmit = useAction(
    e => {
      e.preventDefault()
      if (input.length !== 0) return addTodoAction(input)
    },
    [input]
  );

  const handleChange = ({ target: { value }}) => setInput(value);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={input} />
      <button className="add-todo" type="submit">
        Add Todo
      </button>
    </form>
  )
}