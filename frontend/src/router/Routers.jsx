import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SearchResultList from '../pages/SearchResultList'
import TourDetails from '../pages/TourDetails'
import Tours from '../pages/Tours'
import About from '../pages/About'
import Signup from '../pages/Signup'
import ThankYou from '../pages/ThankYou'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/tour/result" element={<SearchResultList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/thankyou" element={<ThankYou/>} />
    </Routes>
  )
}

export default Routers