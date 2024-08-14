import React, { useEffect } from 'react'
import Task from '../../components/Task'
import MainContentTask from '../../components/MainContentTask'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllTask, setNewPage } from '../../redux/features/tasks/taskSlice'
import { Pagination, Spin } from 'antd'

const AllTasks = () => {
  const dispatch = useDispatch()
  const {isLoading, tasks, pagination} = useSelector(state=>state.task)

  useEffect(()=>{
    dispatch(actFetchAllTask({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    }))
  },[pagination.currentPage])

  const handleChangePage = (newPage)=>{
    dispatch(setNewPage(newPage))
  }

  if(isLoading){
    return <Spin/>
  }
  return (
    <div>
      {tasks.length === 0 ? <div>No tasks</div> : <>
        <MainContentTask tasks={tasks}/>
        <Pagination 
        defaultPageSize={pagination.limitPerPage} 
        current={pagination.currentPage}
        total={pagination.total} 
        onChange={handleChangePage}
        />
      </>}
    </div>
  )
}

export default AllTasks
