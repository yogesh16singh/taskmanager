'use client'
import Button from "@/components/atoms/button/button"
import styles from "./card.module.css"
import OpenTaskModel from "../add-task-model/add-task-model";
import { useState } from "react";
import { formatDate } from "@/utils/helper";

export default function Card({
    handleDrag=()=>{},
    details,
    handleDelete=()=>{},
    handleEditTask=()=>{}
}) {
    const {
        title = "",
        description = "",
        createdAt = "",
        _id
    } = details || {}
    const [isDialogOpen,setIsDialogOpen] = useState(false)
    const [isViewing,setIsViewing] = useState(false)
    async function handleEdit(taskDetails){
        await handleEditTask({
            ...taskDetails,
            _id
        })
        setIsDialogOpen(false)
    }

    return (
        <div
            className={styles.mainWrapper}
            draggable
            onDrag={handleDrag}
        >
            <div>
                <p className={styles.taskTitle}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <div>
                <p>Created At : {formatDate(createdAt)}</p>
                <div className={styles.btnWrapper}>
                    <Button customStyle={styles.delBtn} text="Delete" handleClick={()=>handleDelete(_id)}/>
                    <Button text="Edit" handleClick={()=>setIsDialogOpen(true)}/>
                    <Button text="View Details" customStyle={styles.viewDetlBtn} handleClick={()=>setIsViewing(true)}/>
                </div>
            </div>
            <OpenTaskModel
                isOpen={isViewing ? isViewing : isDialogOpen}
                heading={isViewing ? "View Details" :"Edit Task"}
                title={title}
                description={description}
                setIsOpen={isViewing ? setIsViewing : setIsDialogOpen}
                handleSubmit={handleEdit}
                isViewing = {isViewing}
            />
        </div>

    )
}