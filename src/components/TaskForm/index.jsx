import React, { useEffect } from 'react'
import './style.scss'
import { Button, Input, Radio } from 'antd'
import format from 'date-fns/format'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constant/routes'
import { actCreateNewTask, actDeleteTaskById, actUpdateTaskById } from '../../redux/features/tasks/taskSlice'
import { TASK_STATUS } from '../../constant/task.constant'
const schema = Yup.object().shape({
    title:Yup.string().required('Please input title'),
    creator:Yup.string().required('Please input creator'),
    description:Yup.string().required('Please input description'),
})
const TaskForm = ({isEdit = false, currentTask}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const methods = useForm({
        defaultValues:{
            title:'',
            creator:'',
            createAt:new Date(),
            status: TASK_STATUS.NEW,
            description:''
        },
        resolver:yupResolver(schema)
    })
    const{handleSubmit, control,formState:{errors},reset} = methods
    const onValid = (formValue) => {
        if(isEdit){
            dispatch(actUpdateTaskById({
                id:currentTask.id,
                taskUpdate: formValue
            }))
        }
        dispatch(actCreateNewTask(formValue))
        navigate(ROUTES.ALL_TASK)
    }
    const handleDeleteTask = ()=>{
        dispatch(actDeleteTaskById(currentTask.id))
        navigate(ROUTES.ALL_TASK)
    }
useEffect(()=>{
    if(isEdit && !!currentTask.createAt){
        reset({...currentTask,createAt:new Date(currentTask.createAt)})
    }
},[isEdit,currentTask])
const handleResetForm = ()=>{
    reset({...currentTask,createAt:new Date(currentTask.createAt)})
}
  return (
    <div className='task-form-wrapper'>
      <form className='task-form-container'onSubmit={handleSubmit(onValid)}>
        <div className='task-form'>
            <label className='task-form_label'>Title:</label>
            <Controller
            control={control}
            name='title'
            render={({field})=>{
                return <Input placeholder='Please input...'{...field}/>
            }}
            />
        </div>
        {!!errors.title?.message && <span style={{color:'red'}}>{errors.title?.message}</span>}
        <div className='task-form'>
            <label className='task-form_label'>Creator:</label>
            <Controller
            control={control}
            name='creator'
            render={({field})=>{
                return <Input placeholder='Please input...'{...field}/>
            }}
            />    
        </div>
        {!!errors.creator?.message && <span style={{color:'red'}}>{errors.creator?.message}</span>}
       {isEdit && <div className='task-form'>
            <label className='task-form_label'>Create at:</label>
            <Controller
            control={control}
            name='createAt'
            render={({field})=>{
                return <Input disabled value={format(field.value,'yyyy-mm-dd HH:mm')}/>
            }}
            /> 
        </div>}
        <div className='task-form'>
            <label className='task-form_label'>Description:</label>
            <Controller
            control={control}
            name='description'
            render={({field})=>{
                return <Input placeholder='Please input...'{...field}/>
            }}
            />
        </div>
        {!!errors.description?.message && <span style={{color:'red'}}>{errors.description?.message}</span>}
        <div className='task-form'>
        <label className='task-form_label'></label>
            <Controller control={control} name='status' render={({field})=>
    <Radio.Group onChange={field.onChange} value={field.value}>
      <Radio value={TASK_STATUS.NEW}>{TASK_STATUS.NEW}</Radio>
      <Radio value={TASK_STATUS.DOING}>{TASK_STATUS.DOING}</Radio>
      <Radio value={TASK_STATUS.DONE}>{TASK_STATUS.DONE}</Radio>
    </Radio.Group>}/>
    </div>  
        <div className='task-form-btn'>
        {isEdit && <Button onClick={handleResetForm}>Reset</Button>}
        <Button htmlType='submit'>Save</Button>
        {isEdit && <Button onClick={handleDeleteTask}>Delete</Button>}
        </div>
        
      </form>
    </div>
  )
}

export default TaskForm
