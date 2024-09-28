'use client';
import styles from "./board.module.css";
import { useEffect, useState } from "react";
import SectionWiseBoard from "@/components/sections/section-wise-board/section-wise-board";
import getAllTaskApi from "@/apis/taskApis/getAllTask";
import { TASK_STATUSES } from "@/utils/constants";
import updateTaskApi from "@/apis/taskApis/updateTask";
import SearchBar from "@/components/molecules/search-bar/search-bar";
import Loading from "@/components/atoms/loading-spinner/spinner";

export default function Board({
    isUpdated,
    setIsUpdated
}) {
    const [tasks, setTasks] = useState({
        pending: [],
        completed: [],
        inProgress: []
    });
    const [dragTask, setDragTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    async function handleDragAndDrop(status) {
        if (!dragTask) return;
        console.log(dragTask)
        const {data} = await updateTaskApi({
            ...dragTask,
            status
        })
        console.log("updatee",data)
        setIsUpdated(data?.updatedAt)
        setDragTask(null); 
    }

    async function getTasks(query,sortBy){
        try{
            const {data} = await getAllTaskApi(query,sortBy)
            console.log("alltaskdata",data)
            setTasks(data)
            setIsLoading(false)
        }catch(error){
            console.log(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        setIsLoading(true)
        getTasks();
    },[isUpdated])

    
    function handleSearch(query){
        getTasks(query)
    }

    function handleSort(value){
        getTasks('', value) 
    }

    return (
        <>
            <Loading isVisible={isLoading}/>
            <SearchBar handleSearch={handleSearch} handleSort={handleSort}/>
            <div className={styles.boardsWrapper}>
                    <SectionWiseBoard
                        title="To Do"
                        status= {TASK_STATUSES.pending}
                        data={tasks?.pending}
                        handleDragAndDrop={handleDragAndDrop}
                        setDragTask={setDragTask}
                        setIsUpdated = {setIsUpdated}
                    />
                    <SectionWiseBoard
                        title="In Progress"
                        status={TASK_STATUSES.inProgress}
                        data={tasks?.inProgress}
                        handleDragAndDrop={handleDragAndDrop}
                        setDragTask={setDragTask}
                        setIsUpdated = {setIsUpdated}
                    />
                    <SectionWiseBoard
                        title="Done"
                        status={TASK_STATUSES.completed}
                        data={tasks?.completed}
                        handleDragAndDrop={handleDragAndDrop}
                        setDragTask={setDragTask}
                        setIsUpdated = {setIsUpdated}
                    />
            </div>
        </>
    );
}
