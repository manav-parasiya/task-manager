import React from 'react'

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
                <p>due date: {due_date}</p>
            </div>
        </>
    )
}

export default SingleTaskCard