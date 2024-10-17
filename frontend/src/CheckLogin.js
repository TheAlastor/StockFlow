import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const CheckLogin = () => {
  const isAuthenticated = sessionStorage.getItem('token')

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default CheckLogin
