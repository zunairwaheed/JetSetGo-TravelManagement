import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SearchResultList from '../pages/SearchResultList'
import TourDetails from '../pages/TourDetails'
import Tours from '../pages/Tours'
import About from '../pages/About'
import Signup from '../pages/Signup'
import ThankYou from '../pages/ThankYou'
import Setting from '../pages/Setting'
import TourManagement from '../components/Dashboard/TourManagement'
import UserManagement from '../components/Dashboard/UserManagement'
import BookingManagement from '../components/Dashboard/BookingManagement'
import GalleryManagement from '../components/Dashboard/GalleryManagement'
import SidePanel from '../components/Dashboard/SidePanel'
import Dashboard from '../components/Dashboard/Dashboard'
import ChangePassword from '../pages/changePassword'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/tour/result" element={<SearchResultList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/settings/:id" element={<Setting />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="/admin" element={<SidePanel />}>
        <Route path="tourmanagement" element={<TourManagement />} />
        <Route path="usermanagement" element={<UserManagement />} />
        <Route path="bookingmanagement" element={<BookingManagement />} />
        <Route path="gallerymanagement" element={<GalleryManagement />} />
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default Routers
