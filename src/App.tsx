import { useState } from 'react'

import './App.css'
import Navbar from './navbar'
import About from './pages/About'
import Login from './pages/Login'
import Home from './pages/Home'
import KacikKonesera from './pages/KacikKonesera'


function App() {
  let component 
  console.log(window.location.pathname)
  switch(window.location.pathname){
    case "/":
      component=<Home />
      break
    case "/About":
      component=<About />
      break
    case "/Login":
      component=<Login />
      break
    case "/KacikKonesera":
      component=<KacikKonesera />
      break
    }



  return (
    <>

      <Navbar/>
      {component}

    </>)
}

export default App 
