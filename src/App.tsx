import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar'
import About from './pages/About'
import Login from './pages/Login'
import Home from './pages/Home'
import KacikKonesera from './pages/KacikKonesera'
import Register from './pages/Register';
import CreatePost from './Components/CreatePost';
import Post from './pages/Post';
import Favorites from './pages/Favorites';
import { Link } from "react-router-dom";

function App() {
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    const isAdult = localStorage.getItem('isAdult');
    if (isAdult !== 'true') {
      setShowAgeModal(true);
    }
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('isAdult', 'true');
    setShowAgeModal(false);
  };

  const handleAgeDeny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <>
      {showAgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Weryfikacja wieku</h2>
            <p className="mb-6 text-black">Czy masz ukończone 18 lat?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                onClick={handleAgeConfirm}
              >
                Tak
              </button>
              <button
                className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleAgeDeny}
              >
                Nie
              </button>
            </div>
          </div>
        </div>
      )}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/KacikKonesera" element={<KacikKonesera />} />
          <Route path="/About" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

