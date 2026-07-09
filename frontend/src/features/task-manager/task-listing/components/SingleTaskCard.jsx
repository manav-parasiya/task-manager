import React from 'react'
import moment from 'moment'

// Stlye File import
import '../styles/task-listing.css';

function SingleTaskCard(props) {
    const { name, priority, status, description, due_date } = props?.taskData;
    return (
        <>
            <div className='single-task-card-section'>
                <p>{name}</p>
                <p>Priority: {priority}</p>
                <p>Status: {status}</p>
                {description && <p> Description: { description } </p> }
                <p>due date: {moment(due_date).format('DD MMM YYYY')}</p>
            </div>
        </>
    )
}

export default SingleTaskCard