import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Components/Home'
import LoginPage from './Components/LoginPage'
import Signup from './Components/Signup'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


