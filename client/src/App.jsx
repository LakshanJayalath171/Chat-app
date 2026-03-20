import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hompage from './pages/Hompage'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import bgImage from "./assets/bgImage.svg";

const App = () => {
  return (
    <div className="bg-contain" style={{ backgroundImage: `url(${bgImage})` }}>
      <Routes>
        <Route path='/' element={<Hompage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App