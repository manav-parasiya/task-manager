import React from 'react'
import {createBrowserRouter , RouterProvider } from 'react-router-dom';

// Componets import
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';

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
])


function layout() {
  return (
    <>
      <Header />
      <RouterProvider router={router}/>
      <Footer />
    </>
  )
}

export default layout