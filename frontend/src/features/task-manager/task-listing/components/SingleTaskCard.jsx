import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import api from '../../../../hooks/axiosApiInterceptor'


// Stlye File import
import '../styles/task-listing.css';

function SingleTaskCard(props) {

    const navigate = useNavigate();

    const { name, priority, description, due_date, id } = props?.taskData;
    const handleDelete = async (e) => {
        try {

            e.stopPropagation();
            const result = await api.delete(`/v1/api/tasks/${id}`);
            props.getTasks();
            toast.success(result?.data?.message, {
                position: "top-right"
            });
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Delete failed', { position: "top-right" });
        }
    }

    return (
        <>
            <div className='single-task-card-section' id={id} onClick={() => { navigate(`/edit-task/${id}`) }}>
                <button className="circle" id={id} onClick={(e) => { handleDelete(e) }}>Delete</button>
                <p>{name}</p>
                <p>Priority: {priority}</p>
                {description && <p> Description: {description} </p>}
                <p>due date: {moment(due_date).format('DD MMM YYYY')}</p>
            </div >
        </>
    )
}

export default SingleTaskCard