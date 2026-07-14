import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useParams } from "react-router";

import api from '../../../../hooks/axiosApiInterceptor';


// Stlye File import
import '../styles/task-listing.css';

function EditSingleTask(props) {
    let params = useParams();

    const [TasksData, setTasksData] = useState([]);
    const [data, SetData] = useState();

    const getTasks = async () => {
        const result = await api.get(`https://task-manager-production-4c2f.up.railway.app/v1/api/tasks?limit=5&offset=0&id=${params?.id}`);
        setTasksData(result?.data?.data[0])
    }

    const updateTask = async (e) => {

        e.preventDefault();
        const result = await api.put(`https://task-manager-production-4c2f.up.railway.app/v1/api/tasks/${params?.id}`, 
            {
                due_date: TasksData?.due_date,
                name: TasksData?.name,
                priority: TasksData?.priority,
                description: TasksData?.description,

            }
        );
        // setTasksData(result?.data?.data[0])
    }


    useEffect(() => {
        getTasks();
    }, []);


    useEffect(() => {
    }, [TasksData]);
    return (
        <>
            <div className='single-task-card-section'>
                <form onSubmit={(e) => updateTask(e)}>
                    <label htmlFor="name">Task Name:</label>
                    <input placeholder='task name' defaultValue={TasksData?.name} onChange={(e) => { setTasksData((prev) => ({
                        name: e.target.value,
                        ...prev
                    }))}}/>
                    <label htmlFor="priority">priority:</label>
                    <input defaultValue={TasksData?.priority} placeholder='task priority' />
                    <label htmlFor="status">status:</label>
                    <input defaultValue={TasksData?.status} placeholder='task status' />
                    <label htmlFor="description">description:</label>
                    <input defaultValue={TasksData?.description} placeholder='task description' />
                    <p>due date: {moment(TasksData?.due_date).format('DD MMM YYYY')}</p>
                    <button type="submit">Update Task</button>
                </form>

            </div>
        </>
    )
}

export default EditSingleTask