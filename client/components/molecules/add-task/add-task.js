import Button from "@/components/atoms/button/button"
import styles from "./add-task.module.css"
import { useState } from "react"
import OpenTaskModel from "../add-task-model/add-task-model"
import createTaskApi from "@/apis/taskApis/createTask"

export default function AddTask({
    setIsUpdated = ()=>{}
}){
    const [isDialogOpen,setIsDialogOpen] = useState(false)
    const [errorMsg,setErrorMsg] = useState('')

    async function handleAddTask(task){
        try{
            const {title,description} = task || {}
            if(!title?.trim() && !description?.trim()){
                setErrorMsg('Please enter a title or description.')
                return
            } 
            const{ data} = await createTaskApi({
                title,description
            })
            console.log("task data",data)
            if(data){
                setIsDialogOpen(false)
                console.log(data.updatedAt)
                setIsUpdated(data?.updatedAt)
            }
        }catch(error){
            console.log(error.message)
            setErrorMsg(`Something went wrong. Please try again later`)
        }
    }

    return (
        <>
            <div className={styles.mainWrapper}>
                <Button text="Add Task" customStyle={styles.addTskBtn} handleClick={()=>setIsDialogOpen(true)}/>
            </div>
            <OpenTaskModel 
                isOpen={isDialogOpen} 
                setIsOpen={setIsDialogOpen}
                errorMsg = {errorMsg}
                setErrorMsg ={setErrorMsg}
                handleSubmit = {handleAddTask}
            />
        </>
    )
}