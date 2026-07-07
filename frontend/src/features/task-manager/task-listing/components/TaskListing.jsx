import React, { useEffect, useState } from 'react'

// Componets import
import SingleTaskCard from './SingleTaskCard';


import api from '../../../../hooks/axiosApiInterceptor';

function TaskListing() {

  const [TasksData, setTasksData] = useState([]);
  const [data, SetData] = useState();

  const getTasks = async () => {
    const result = await api.get('https://task-manager-production-4c2f.up.railway.app/v1/api/tasks?limit=5&offset=0');
    setTasksData(result?.data?.data)
  }

  useEffect(() => {
    getTasks();
  }, []);


  return (
    <>
      <div className='task-listing-section container'>
        {

          TasksData?.length > 0 ? (
            <>
              {
                TasksData?.map((task, index) => {
                  return <SingleTaskCard taskData={task} key={task?.id} />
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