import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const CheckLogin = () => {
  const isAuthenticated = sessionStorage.getItem('token') // Check if the user is logged in (based on token)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default CheckLogin
