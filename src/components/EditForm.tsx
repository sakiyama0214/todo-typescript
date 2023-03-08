import React from 'react'

const EditForm: React.FC = ({newTitle, handleEditInputChange, handleEditTodo, onClickBack}) => {
  return (
        <div className='editForm'>
        <input
        type='text'
        placeholder='todoを編集'
        value={newTitle}
        onChange={handleEditInputChange}
        />
        <button onClick={handleEditTodo}>編集</button>
        <button onClick={onClickBack}>キャンセル</button>
    </div>
  )
}

export default EditForm