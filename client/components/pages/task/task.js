'use client'
import AddTask from "@/components/molecules/add-task/add-task";
import Header from "@/components/molecules/header";
import Board from "@/components/organisms/board/board";
import { useState } from "react";
import styles from "./task.module.css"

export default function TaskPage(){
    const [isUpdated,setIsUpdated] = useState('')
    return(
        <>
            <Header/>
            <div className={styles.mainWrapper}>
                <AddTask setIsUpdated={setIsUpdated}/>
                <Board isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
            </div>
        </>
    )
}