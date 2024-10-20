import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import NewRequest from './pages/NewRequest'
import Requests from './pages/Requests'
import MyRequests from './pages/MyRequests'
import Recover from './pages/Recover'
import CheckLogin from './CheckLogin'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/register" element={<Register />} />
        <Route path="/login/recover" element={<Recover />} />
        <Route element={<CheckLogin />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/newRequest" element={<NewRequest />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/myRequests" element={<MyRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
