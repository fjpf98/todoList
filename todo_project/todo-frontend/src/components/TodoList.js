import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/todos/")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch("http://localhost:8000/api/todos/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then((response) => response.json())
      .then((todo) => setTodos([...todos, todo]));
    setNewTodo("");
  };

  const markAsCompleted = (id) => {
    fetch(`http://localhost:8000/api/todos/${id}/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      });
  };

  const removeTodo = (id) => {
    fetch(`http://localhost:8000/api/todos/${id}/delete/`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div className="container">
      <h1>Task list</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <div className="icons">
              {!todo.completed && (
                <FaCheckCircle
                  className="icon check-icon"
                  onClick={() => markAsCompleted(todo.id)}
                />
              )}
              <FaTrashAlt
                className="icon delete-icon"
                onClick={() => removeTodo(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="buttomDiv">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}

export default TodoList;
