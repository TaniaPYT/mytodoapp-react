import React, {useState} from "react"
import moment from"moment"

export default function Main(){
  const [todos, setTodos] = React.useState([])
  const [completedTodos, setCompletedTodos] = React.useState([])

  function addTodo(){
    const newTodoText = document.getElementById("input-item").value
    const newTodoPriority = document.getElementById("input-priority").value
    const newTodoDate = moment().format('MM-D-YYYY')

    setTodos((prevState) => {
      return [...prevState, {task: newTodoText, completed: false, priority: newTodoPriority, date: newTodoDate}]
    })
    document.getElementById("input-item").value = ""
    document.getElementById("input-priority").value = ""
  }

  function deleteTodo(index){
    setTodos((prevState) => {
      return [
        ...prevState.slice(0,index),
        ...prevState.slice(index + 1),
      ]
    })
  }

  function completeTodo(index){

    const todoCompleted = todos[index];

    setTodos((prevState) => {
        return prevState.map((todo, i) => {
          if (i === index) {
            return {
              ...todo,
              completed: true // toggle the completed property of the todo
            };
          }
          return todo;
        });
      });

    // Move the completed task to the completedTodos array
    setCompletedTodos((prevState) => {
      return [...prevState, todoCompleted]
    })
  }


  /* Render -- Completed List*/
  function CompletedTodoItem({todo}){
    return(
      <div>
        <span>{todo.task}</span>
      </div>
    )
  }

  /* Render -- Todo List*/
  function TodoItem({todo, index}){
    const todoStyle = {
      textDecoration: todo.completed ? "line-through" : "none"
    }
    return(
      <div className="todo-item">
        <input className="checkbox" type="checkbox" checked={todo.completed} onChange={() => completeTodo(index)} />
        <span style={todoStyle}>
            {todo.task}-
            Date: {todo.date.toString()}-
            Priority: {todo.priority}
        </span>
        <button onClick={() => deleteTodo(index)}>x</button>
      </div>
    )
  }

    return(
      <div>
        <div className="search-bar">
          <input
            id="input-item"
            className="input-item"
            type='text' placeholder="what to do next .."
          />
          <input
            id="input-priority"
            className="input-priority"
            type="number" 
            placeholder="priority"
          />
          <button className="add-button" onClick={addTodo}>add</button>
        </div>
        <div className="list-wrapper">
          <div  className="column-todo-list">
            <h2 className="listTitle">Todo List</h2>
            <span className="todoItems">
              {todos.map((todo, index) => (<TodoItem todo={todo} index={index} key={index} />))}
            </span>
          </div>
          <div  className="column-completed-list">
            <h2 className="listTitle">Completed List</h2>
            <span className="completedItems">
              {completedTodos.map((todo,index) => <CompletedTodoItem todo={todo} index={index} key={index}/>)}
            </span>
          </div>
        </div>
      </div>
    )
  }