import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Componets import
import SingleTaskCard from './SingleTaskCard';


import api from '../../../../hooks/axiosApiInterceptor';

function TaskListing() {

  const [loading, setLoading] = useState(true);
  const [TasksData, setTasksData] = useState([]);

  const getTasks = async () => {
    const result = await api.get('/v1/api/tasks?limit=5&offset=0');
    setTasksData(result?.data?.data)
    setLoading(false);
  }

  useEffect(() => {
    getTasks();
  }, []);


  return (
    <>
      <div className='task-listing-section container'>
        {
          loading == false ?
            (
              <>
                <Link to={'create-task'}>Create Task</Link>
                {
                  TasksData?.length > 0 ? (
                    <>
                      {
                        TasksData?.map((task, index) => {
                          return <SingleTaskCard taskData={task} key={task?.id} getTasks={getTasks} />
                        })
                      }
                    </>
                  ) : (
                    <>
                      <p>There are no Tasks to show</p>
                    </>
                  )
                }
              </>
            )
            :
            (
              <>
                <p>Loading...</p>
              </>
            )

        }


      </div>
    </>
  )
}

export default TaskListing