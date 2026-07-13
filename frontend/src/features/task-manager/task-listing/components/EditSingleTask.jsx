import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useParams } from "react-router";

import api from '../../../../hooks/axiosApiInterceptor';


// Stlye File import
import '../styles/task-listing.css';

function EditSingleTask(props) {
    let params = useParams();
    console.log(params?.id)

    const [TasksData, setTasksData] = useState([]);
    const [data, SetData] = useState();

    const getTasks = async () => {
        const result = await api.get(`https://task-manager-production-4c2f.up.railway.app/v1/api/tasks?limit=5&offset=0&id=${params?.id}`);
        setTasksData(result?.data?.data)
    }

    useEffect(() => {
        getTasks();
    }, []);


    return (
        <>
            <div className='single-task-card-section'>
                test
                {/* <p>{name}</p>
                <p>Priority: {priority}</p>
                <p>Status: {status}</p>
                {description && <p> Description: {description} </p>}
                <p>due date: {moment(due_date).format('DD MMM YYYY')}</p> */}
            </div>
        </>
    )
}

export default EditSingleTask