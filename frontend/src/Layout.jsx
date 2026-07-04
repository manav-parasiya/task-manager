import React from 'react'

// Componets import
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function layout() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default layout