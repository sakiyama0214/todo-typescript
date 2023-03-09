import { Box, UnorderedList, ListItem, Button, Select, HStack, background, Flex } from '@chakra-ui/react';
import React from 'react'
import { Todo } from '../App'


type TodoProps = {
    id: number;
    filteredTodos: Todo[];
    handleStatusChange: (id: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClickEdit: (title: string, id: number) => void;
    onClickDelete: (todo: Todo) => void;
}

const TodoList:React.FC<TodoProps> = ({id, filteredTodos, handleStatusChange, onClickDelete, onClickEdit}) => {
  return (
    <Box className='todoList'>
        <UnorderedList>
            {filteredTodos.map((todo) => {
                return (
                    <HStack>
                        <ListItem key={todo.id} m={3}>
                            <HStack>
                            <Box as='span' 
                            color={todo.status === 'notStarted' ? 'red.500' :
                                todo.status === 'inProgress' ? 'yellow.500' :
                                'green.500'}
                            fontSize='18px'
                            p='4'
                            >{todo.title}</Box>
                            <Select
                                value={todo.status} 
                                onChange={(e) => handleStatusChange(todo.id, e)}
                                
                            >
                                <option value='notStarted'>未着手</option>
                                <option value='inProgress'>作業中</option>
                                <option value='done'>完了</option>
                            </Select>
                            <Button onClick={() => onClickEdit(todo.title, todo.id)}
                                my='3'
                                mr='10'
                                backgroundColor='green.100'
                                color='gray.600'
                                px='6'
                                _hover={{backgroundColor: 'green.200', color: 'gray.700'}}
                            >編集</Button>
                            <Button onClick={() => onClickDelete(todo)}
                                my='3'
                                backgroundColor='red.100'
                                color='gray.600'
                                px='6'
                                _hover={{backgroundColor: 'red.200', color: 'gray.700'}}
                            >削除</Button>
                            </HStack>
                        </ListItem>
                    </HStack>
                )
            })}
          
        </UnorderedList>
    </Box>
  )
}

export default TodoList