import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import ScorePage from './ScorePage';
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="*" element={<Login/> } />
        </Routes>
    </Router>
  )
}

export default App
