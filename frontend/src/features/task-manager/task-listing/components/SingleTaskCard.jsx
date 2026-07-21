import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
// Stlye File import
import '../styles/task-listing.css';

function SingleTaskCard(props) {

    const navigate = useNavigate();

    const { name, priority, description, due_date,id } = props?.taskData;
    return (
        <>
            <div className='single-task-card-section' id={id} onClick={()=> { navigate(`/edit-task/${id}`)}}>
                <p>{name}</p>
                <p>Priority: {priority}</p>
                {description && <p> Description: { description } </p> }
                <p>due date: {moment(due_date).format('DD MMM YYYY')}</p>
            </div>
        </>
    )
}

export default SingleTaskCard