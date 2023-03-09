import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react'


type InputFormProps = {
    todoTitle: string;
    handleSetTodoTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddTodo: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const InputForm:React.FC<InputFormProps> = ({todoTitle, handleSetTodoTitle, handleAddTodo}) => {
  return (
    <Box className='todoForm'>
        <Input
        type='text'
        placeholder='todoを入力'
        value={todoTitle}
        onChange={handleSetTodoTitle}
        width='300px'
        p={2}
        mr={5}
        my={5}
        />
        <Button onClick={handleAddTodo}
        py={2}
        mb={1}
        backgroundColor={'cyan.200'}
        color='gray.600'
        _hover={{backgroundColor: 'cyan.300', color: 'gray.700'}}
        >
          追加</Button>
    </Box>
  )
}

export default InputForm