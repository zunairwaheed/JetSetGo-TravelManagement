import React from 'react'
import { AdminTourManagement, AdminUserManagement, AdminGalleryManagement, AdminBookingManagement } from '../components/Dashboard/AdminDashboard'
import TourManagement from '../components/Dashboard/TourManagement'
import SidePanel from '../components/Dashboard/SidePanel'

const Admin = () => {
  return (
    <>
      {/* <AdminTourManagement />
      <AdminUserManagement />
      <AdminGalleryManagement/>
      <AdminBookingManagement/> */}
      <SidePanel/>
      {/* <TourManagement/> */}
      
    </>
  )
}

export default Admin