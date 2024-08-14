import React from 'react'
import Task from '../Task'
import './style.scss'

const MainContentTask = (props) => {
  const renderTask = (tasks) => {
    return tasks.map((task)=>{
      return <Task key={task.id} task={task} />
    })
  }
  return (
    <div className='main-content-task'>
      {renderTask(props.tasks)}
    </div>
  )
}

export default MainContentTask
