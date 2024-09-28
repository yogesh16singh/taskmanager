import DialogModel from "@/components/organisms/dialog/dialog-model"
import styles from "./add-task-model.module.css"
import Button from "@/components/atoms/button/button";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export default function OpenTaskModel({
    isOpen = false,
    setIsOpen = ()=>{},
    errorMsg='',
    setErrorMsg = ()=>{},
    handleSubmit = ()=>{},
    title = '',
    description ='',
    heading = '',
    isViewing = false
}){
    const [taskDetails, setTaskDetails] = useState({
        title,
        description
    })
    useEffect(()=>{
        setTaskDetails({
            title,
            description
        })
    },[title,description])
    console.log("t,d",title,description);
    console.log("taskdetails",taskDetails);
    
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(key,value){
        if(isViewing) return
        setErrorMsg('')
        setTaskDetails({
            ...taskDetails,
            [key] : value
        })
    }

    async function handleAddBtn(task){
        if(isSubmitting) return
        flushSync(()=>setIsSubmitting(true))
        await handleSubmit(task)
        setIsSubmitting(false)
        setTaskDetails({})
    }


    return (
        <DialogModel isOpen={isOpen}>
            <div className={styles.mainWrapper}>
                <p className={styles.heading}>{heading || "Add Task"}</p>
                <input
                    type="text"
                    placeholder="Enter Title"
                    className={styles.input}
                    onChange={(e)=>handleChange("title",e.target.value)}
                    value={taskDetails.title}
                    disabled = {isViewing}
                />
                <input
                    type="text"
                    placeholder="Enter Description"
                    className={styles.input}
                    onChange={(e)=>handleChange("description",e.target.value)}
                    value={taskDetails.description}
                    disabled = {isViewing}
                />
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <div className={styles.btnWrapper}>
                    {!isViewing && <Button text={isSubmitting ? "Proceeding..." :heading ? "Save" :"Add Task"} customStyle={styles.addTaskBtn} handleClick={()=>{handleAddBtn(taskDetails)}}/>}
                    <Button text="Cancel" handleClick={()=>setIsOpen(false)} isPrimaryBtn={false}/>
                </div>
            </div>
        </DialogModel>
    )
}