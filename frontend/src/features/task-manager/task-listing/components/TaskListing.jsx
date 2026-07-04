import React, { useEffect, useState } from 'react'

// Componets import
import SingleTaskCard from './SingleTaskCard';


function TaskListing() {

  const [TasksData, setTasksData] = useState([]);

  useEffect(() => {
    setTasksData([
      {
        id: 1,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 2,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 3,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 4,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 5,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 6,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 7,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 8,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 9,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
      {
        id: 10,
        name: 'task name test',
        priority: 'high',
        status: 'pending',
        due_date: 'Today',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus reprehenderit ratione at deleniti itaque consectetur nemo quas impedit quasi!"
      },
    ])
  }, []);


  return (
    <>
      <div className='task-listing-section container'>
        {

          TasksData?.length > 0 ? (
            <>
              {
                TasksData?.map((task, index) => {
                  return <SingleTaskCard taskData={task} key={task?.id}/>
                })
              }
            </>
          ) : (
            <>
              <p>There are no Tasks to show</p>
            </>
          )
        }

      </div>
    </>
  )
}

export default TaskListing