import "./App.css";
import React, { useState, useEffect } from "react";

const constructTodoList = (
  todos,
  handleDeleteItem,
  handleDoLater,
  handleCompleted
) => {
  console.log(todos);
  return (
    <div>
      <ul>
        {todos.map((todo, key) => (
          <li key={key}>
            {todo}
            <button onClick={() => handleDeleteItem(key)}>X</button>
            <button onClick={() => handleDoLater(key)}>||</button>
            <button onClick={() => handleCompleted(key)}>\/</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [currentText, setCurrentText] = useState("");
  const [todos, setTodos] = useState([]);
  const [laterTodos, setLaterTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleTodo = (event) => {
    // console.log(event.target.value, event.key);
    let newTodos = [...todos];
    newTodos.push(event.target.value);
    setTodos(newTodos);
    setCurrentText("");
  };
  const handleValue = (event) => {
    setCurrentText(event.target.value);
  };

  const handleDeleteItem = (deleteIndex) => {
    let newTodos = [...todos];
    newTodos.splice(deleteIndex, 1);
    setTodos(newTodos);
  };

  const handleCompleted = (completedIndex) => {
    let newTodos = [...todos];
    let newCompletedTodo = [...completedTodos];

    newCompletedTodo.push(newTodos[completedIndex]);
    newTodos.splice(completedIndex, 1);
    setTodos(newTodos);
    setCompletedTodos(newCompletedTodo);
  };

  const handleDoLater = (todoIndex) => {
    let newTodos = [...todos];
    let newlaterTodos = [...laterTodos];
    newlaterTodos.push(newTodos[todoIndex]);
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
    setLaterTodos(newlaterTodos);
  };

  return (
    <div>
      <div>
        <input
          id="todoinput"
          type="text"
          placeholder="Enter your todo here..."
          onKeyDown={(e) => (e.key === "Enter" ? handleTodo(e) : null)}
          value={currentText}
          onChange={handleValue}
        />
      </div>
      <div>
        <span>In progress</span>
        {constructTodoList(
          todos,
          handleDeleteItem,
          handleDoLater,
          handleCompleted
        )}
      </div>
      <div>
        <span>Do later</span>
        <div>
          {constructTodoList(
            laterTodos,
            handleDeleteItem,
            undefined,
            handleCompleted
          )}
        </div>
      </div>
      <div>
        <span>Completed</span>
        <div>{constructTodoList(completedTodos)}</div>
      </div>
    </div>
  );
}

export default App;
