import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react'

type EditProps = {
    newTitle: string;
    handleEditInputChange: any;
    handleEditTodo: any;
    onClickBack: any;
}
const EditForm: React.FC<EditProps> = ({newTitle, handleEditInputChange, handleEditTodo, onClickBack}) => {
  return (
        <Box>
            <Input
            type='text'
            placeholder='todoを編集'
            value={newTitle}
            onChange={handleEditInputChange}
            width='300px'
            p={2}
            mr={5}
            my={5}
            />
            <Button onClick={handleEditTodo}
              py={2}
              mb={1}
              backgroundColor={'cyan.200'}
              color='gray.600'
              _hover={{backgroundColor: 'cyan.300', color: 'gray.700'}}
            >編集</Button>
            <Button onClick={onClickBack}
              py={2}
              mb={1}
              color='gray.600'
              _hover={{color: 'gray.700'}}
            >キャンセル</Button>
        </Box>
  )
}

export default EditForm