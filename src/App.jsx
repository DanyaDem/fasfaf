import React, { useState } from 'react';
import './App.css'


function Todo({ todo, index, deleteTodo, editTodo }) {
    const [checked, setChecked] = useState(false);
    const [text_decorate, setText_decorate] = useState("");
    const handleChange = () => {
        setChecked(!checked);
        if (!checked){
            setText_decorate("line-through");
        } else {
            setText_decorate("");
        }
    };

  return (
      <div
          className="todo"
          style={{textDecoration: text_decorate}}
      >
        <div>

          <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange()}
          />
        </div>
        {/*  div for todo text with edit on click*/}
          <div onClick={() => (editTodo(index))}>
              {todo.text}
          </div>

          {/*delete button*/}
            <button className='button' type='button' onClick={() => (deleteTodo(index) )}>delete</button>
      </div>
  );
}

function TodoForm({ addTodo, inputText, setInputText }) {
    let value = inputText;
    let setValue = setInputText;

  const handleSubmit = a => {
    a.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={value}
            onChange={a => setValue(a.target.value)}
        />
        <button className='button' type='button' onClick={() => addTodo(value)}>add</button>
      </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
  ]);
  const [input, setInput] = useState("")

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  //delete button function
    const deleteTodo = (TodoIndex) => {
        const newTodos = [...todos];
        newTodos.splice(TodoIndex, 1);
        setTodos(newTodos);
    }

    // edit button function
    const editTodo = (TodoIndex) => {
        const newTodos = [...todos];
        let lastValue = newTodos.splice(TodoIndex, 1);
        setTodos(newTodos);
        setInput(lastValue[0].text);

    }



  return (
      <div className="Danil">
        <div className="todo-list">
            <TodoForm addTodo={addTodo} inputText={input} setInputText={setInput}/>
          {todos.map((todo, index) => (
              <Todo
                  key={index}
                  index={index}
                  todo={todo}
                    deleteTodo={deleteTodo}
                  editTodo={editTodo}

              />
          ))}
        </div>
      </div>
  );
}

export default App