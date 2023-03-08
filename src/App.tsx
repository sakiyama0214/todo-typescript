import { Box, Center, ChakraProvider, Container, Select, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import './App.css';
import EditForm from './components/EditForm';
import InputForm from './components/InputForm';
import TodoList from './components/TodoList';

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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');

  

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

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'));
          break;
        case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'));
          break;
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter,todos]);

  return (
    <ChakraProvider>
      <Container>
        <Center fontSize='30px' fontWeight='bold' p={'5'}>TODO LIST</Center>
        {isEditing? (
          <EditForm
            newTitle={newTitle}
            handleEditInputChange={handleEditInputChange}
            handleEditTodo={handleEditTodo}
            onClickBack={onClickBack}
          />
        ) : (
          <InputForm
            todoTitle={todoTitle}
            handleSetTodoTitle={handleSetTodoTitle}
            handleAddTodo={handleAddTodo}
          />
        )}
        <Text fontWeight={'bold'} color='gray.700'>ソート</Text>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          width='180px'
          pb={3}
          mb={3}
        >
          <option value='all'>全て</option>
          <option value='notStarted'>未着手</option>
          <option value='inProgress'>作業中</option>
          <option value='done'>完了</option>
        </Select>
        <TodoList
        filteredTodos={filteredTodos}
        handleStatusChange={handleStatusChange}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        />
      </Container>
    </ChakraProvider>
  );
}

export default App;
