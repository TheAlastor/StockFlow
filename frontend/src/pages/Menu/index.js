import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar'

export default function Menu() {
  return (
    <div className="menu-page-container">
      <Navbar />
      <h1>StockFlow</h1>

      <div className="menu-container">
        <section className="form-menu">
          <form>
            <Link to="http://localhost:3000/NewRequest">New Request</Link>
            <Link to="/MyRequests">My Requests</Link>
            <Link to="/Requests">All Requests</Link>
            <Link to="/AccountSettings">Account Settings</Link>
          </form>
        </section>
      </div>
    </div>
  )
}
