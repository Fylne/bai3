import React from 'react'
import './style.scss'
import { Button, Input } from 'antd'
import {useNavigate} from 'react-router-dom'
import { ROUTES } from '../../constant/routes'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchKey } from '../../redux/features/tasks/taskSlice'
const HeaderComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchKey = useSelector(state=>state.task.searchKey)
  const handleRedirectAddTask = ()=>{
    navigate(ROUTES.ADD_NEW)
  }

  const handleSearchTask = (event)=>{
    event.preventDefault()
  }

  const handleChangeInputSearch = (event)=>{
    const value = event.target.value
    dispatch(setSearchKey(value))
  }

  return (
    <div className='header-container'>
      <Button onClick={handleRedirectAddTask}>Create New Task</Button>
      <form className='header-container_search-area' onSubmit={handleSearchTask}>
        <Input placeholder='Please input search ...' value={searchKey} onChange={handleChangeInputSearch}/>
        <Button type='submit'>Search</Button>
      </form>
    </div>
  )
}

export default HeaderComponent;
