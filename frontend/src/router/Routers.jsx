import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SearchResultList from '../pages/searchResultList'
import TourDetails from '../pages/TourDetails'
import Tours from '../pages/Tours'
import About from '../pages/About'
import Signup from '../pages/Signup'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/tour" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tour/result" element={<SearchResultList />} />
    </Routes>
  )
}

export default Routers