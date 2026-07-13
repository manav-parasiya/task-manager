import React from 'react'
import {createBrowserRouter , RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// Componets import
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import CreateTask from './features/task-manager/task-listing/components/CreateSingleTask';
import EditSingleTask from './features/task-manager/task-listing/components/EditSingleTask';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
   {
    path: '/login',
    element: <Login />
  },
   {
    path: '/register',
    element: <Register />
  },
  {
    path: '/create-task',
    element: <CreateTask />
  },
  {
    path: '/edit-task/:id',
    element: <EditSingleTask />
  },
])


function layout() {
  return (
    <>
      <Header />
      <RouterProvider router={router}/>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default layout