import React from 'react'
import './style.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constant/routes'

const Task = (props) => {
  const navigate = useNavigate()
  const handleRedirectToDetailPage = () =>{
    const taskId = props.task.id
    navigate(generatePath(ROUTES.UPDATE_TASK,{id:taskId}))
  }

  return (
    <div className='task-container'>
      <div className='task-container_title'
      onClick={handleRedirectToDetailPage}
      >Title:{props.task.title}</div>
      <div className='task-container_author'>Creator: {props.task.creator}</div>
      <div className='task-container_status'>Status: {props.task.status}</div>
      <div className='task-container_divider'></div>
      <div className='task-container_description'>
        <div className='task-container_des-title'>Description:</div>
        <div className='task-container_des-content'>
        {props.task.description}
        </div>
      </div>
    </div>
  )
}

export default Task
