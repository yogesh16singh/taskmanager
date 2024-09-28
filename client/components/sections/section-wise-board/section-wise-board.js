'use client'
import Card from '@/components/molecules/card/card'
import styles from './board.module.css'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import deleteTaskApi from '@/apis/taskApis/deleteTask'
import updateTaskApi from '@/apis/taskApis/updateTask'

export default function SectionWiseBoard({
    title = '',
    status,
    data = [],
    handleDragAndDrop = ()=>{},
    setDragTask=()=>{},
    setIsUpdated = ()=>{}
}){
    const draggedItem = useRef(null)

    function handleDragCard(task){
       flushSync(()=> setDragTask(task))
        draggedItem.current = task;
    }


    function handleOnDrop(e){
        e.preventDefault()
        const eventStatus = e.currentTarget.getAttribute('data-status')
        handleDragAndDrop(eventStatus)
        draggedItem.current = null
    }

    async function handleDelete(taskId){
        try{
            const{ data} = await deleteTaskApi({taskId})
            if(data){
                setIsUpdated(data?.updatedAt)
            }
        }catch(error){
            console.log(error.message)
        }
    }

    async function handleEdit(taskDetails){
        try{
            const {
                title ='',
                description='',
                _id = '' 
            } = taskDetails || {}
            if(!title && !description){
                alert("Please fill atleast one field")
                return
            }
            const{ data} = await updateTaskApi({
                title,description,_id
            })
            if(data){
                setIsUpdated(data?.updatedAt)
            }
        }catch(error){
            console.log(error.message)
        }
    }

    return(
        <div className={styles.mainWrapper} onDrop={handleOnDrop} onDragOver={(e)=>{e.preventDefault()}} data-status = {status}>
            <p className={styles.title}>{title}</p>
            {data.map((task,index)=> 
                <Card 
                    key={index} 
                    handleDrag={()=>handleDragCard(task)} 
                    details = {task} 
                    handleDelete={handleDelete}
                    handleEditTask={handleEdit}
                />)}
        </div>
    )
}