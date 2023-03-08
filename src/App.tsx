import React, { useState } from 'react';
import './App.css';
import EditForm from './components/EditForm';

export type Todo = {
    id: number,
    title: string,
    status: string,
    detail: string
  }
const App: React.FC = () => {
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoId, setTodoId] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [editId, setEditId] = useState<number>();
  

  const handleSetTodoTitle = (e: any) => {
    setTodoTitle(e.target.value);
  }

  const handleAddTodo = () => {
    setTodos([...todos, {id: todoId, title: todoTitle, status: 'notStarted', detail: ''}])
    setTodoId(todoId + 1)
    setTodoTitle('');
    console.log(todos);
  }

  const onClickDelete = (targetTodo: Todo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo))
  }

  const onClickEdit = (title: string, id: number) => {
    setIsEditing(true);
    setEditId(id);
    setNewTitle(title);
  }

  const handleEditInputChange = (e: any) => {
    setNewTitle(e.target.value);
  } 

  const handleEditTodo = () => {
    setTodos([...todos].map((todo) => {
      return todo.id === editId ? {...todo, title: newTitle}
      : todo
    }));
    setIsEditing(false);
  }

  const onClickBack = () => {
    setIsEditing(false);
    setNewTitle('');
  }

  const handleStatusChange = (id: number, e: any) => {
    const newTodos = todos.map((todo) => {
      return ({...todo})
    });

    setTodos(newTodos.map((todo) => 
      todo.id === id ? {...todo, status: e.target.value}: todo
    ))
  }

  return (
    <>
    {isEditing? (
      <EditForm
        newTitle={newTitle}
        handleEditInputChange={handleEditInputChange}
        handleEditTodo={handleAddTodo}
        onClickBack={onClickBack}
      />
    ) : (
      <div className='todoForm'>
        <input
        type='text'
        placeholder='todoを入力'
        value={todoTitle}
        onChange={handleSetTodoTitle}
        />
        <button onClick={handleAddTodo}>追加</button>
      </div>
    )}
      
      <div className='todoList'>
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <span>{todo.title}</span>
                <select value={todo.status} onChange={(e) => handleStatusChange(todo.id, e)}>
                  <option value='notStarted'>未着手</option>
                  <option value='inProgress'>作業中</option>
                  <option value='done'>完了</option>
                </select>
                <button onClick={() => onClickEdit(todo.title, todo.id)}>編集</button>
                <button onClick={() => onClickDelete(todo)}>削除</button>
              </li>
            )
          })}
          
        </ul>
      </div>
    </>
  );
}

export default App;
