import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useParams } from "react-router";
import { toast } from "react-toastify";

import api from '../../../../hooks/axiosApiInterceptor';


// Stlye File import
import '../styles/task-listing.css';

function EditSingleTask(props) {
    let params = useParams();

    const [TasksData, setTasksData] = useState([]);
    const [data, SetData] = useState();

    const getTasks = async () => {
        const result = await api.get(`/v1/api/tasks?limit=5&offset=0&id=${params?.id}`);
        setTasksData(result?.data?.data[0])
    }

    const updateTask = async (e) => {
        try {
            e.preventDefault();
            const result = await api.put(`/v1/api/tasks/${params?.id}`,
                {
                    due_date: TasksData?.due_date,
                    name: TasksData?.name,
                    priority: TasksData?.priority,
                    description: TasksData?.description,

                }
            );

            if (result?.data?.error === false) {
                toast.success(result?.data?.message, {
                    position: "top-right"
                });
            }
        } catch (error) {
            toast.error(error?.message, {
                position: "top-right"
            });
        }
    }

    const updateDetail = (e) => {
        setTasksData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value

        }))
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
                    <input placeholder='task name' value={TasksData?.name} name='name' onChange={(e) => updateDetail(e)} />
                    <label htmlFor="priority">priority:</label>
                    <input value={TasksData?.priority} name='priority' placeholder='task priority' onChange={(e) => updateDetail(e)} />
                    <label htmlFor="description">description:</label>
                    <input value={TasksData?.description} name='description' placeholder='task description' onChange={(e) => updateDetail(e)} />
                    <label htmlFor="due_date">due date:</label>
                    <input
                        type="date"
                        name="due_date"
                        value={TasksData?.due_date ? moment(TasksData.due_date).format('YYYY-MM-DD') : ''}
                        onChange={updateDetail}
                    />
                    <button type="submit">Update Task</button>
                </form>

            </div>
        </>
    )
}

export default EditSingleTask