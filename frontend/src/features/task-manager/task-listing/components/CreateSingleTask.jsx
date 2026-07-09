import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import api from '../../../../hooks/axiosApiInterceptor'

function CreateSingleTask() {

  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [due_date, setDueDate] = useState('')

  const updateName = (e) => {
    setName(e?.target.value)
  }

  const updateDescription = (e) => {
    setDescription(e?.target.value)
  }

  const updatePriority = (e) => {
    setPriority(e?.target.value)
  }

  const updateDueDate = (e) => {
    setDueDate(e?.target.value)
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const result = await api.post('https://task-manager-production-4c2f.up.railway.app/v1/api/tasks', {
      name,
      description,
      priority,
      due_date
    });

    if(result?.status === 201 && result?.data?.error === false){
     navigate('/')
     toast.success(result?.data?.message, {
      position: "top-right"
    });
    }

  }
  return (
    <>
      <div className='login-section container'>
        <div className="login-card-container">
          <div className="login-card">
            <form action="" method="post" onSubmit={(e) => submitForm(e)}>
              <label htmlFor="name">Name</label>
              <input type="text" onChange={(e) => updateName(e)} name="name" id="name" value={name} />
              <label htmlFor="description">Description</label>
              <input type="text" onChange={(e) => updateDescription(e)} name="description" id="description" value={description} />
              <label htmlFor="priority">Priority</label>
              <input type="text" onChange={(e) => updatePriority(e)} name="priority" id="priority" value={priority} />
              <label htmlFor="due_date">Due date</label>
              <input type="text" onChange={(e) => updateDueDate(e)} name="due_date" id="due_date" value={due_date} />
              <button type="submit">CreateTask</button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default CreateSingleTask