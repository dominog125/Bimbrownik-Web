import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar'
import About from './pages/About'
import Login from './pages/Login'
import Home from './pages/Home'
import KacikKonesera from './pages/KacikKonesera'
import Register from './pages/Register';


function App() {


  return (
  

    <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/KacikKonesera" element={<KacikKonesera />} />
                <Route path="/About" element={<About />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
        )
}

export default App 
