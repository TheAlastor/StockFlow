import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu-page-container">
      <form className="header-container">
        <div className="home">
          <Link to="http://localhost:3000/Menu">StockFlow</Link>
        </div>

        <div className="navigation">
          <Link to="http://localhost:3000/NewRequest">New Requests</Link>
          <Link to="http://localhost:3000/MyRequests">My Requests</Link>
          <Link to="http://localhost:3000/AllRequests">All Requests</Link>
        </div>

        <div className="profile">
          <Link to="http://localhost:3000/Account">Account Settings</Link>
        </div>
      </form>

      <h1>StockFlow</h1>

      <div className="menu-container">
        <section className="form-menu">
          <form>
            <Link to="http://localhost:3000/NewRequest">Create New Request</Link>
            <Link to="#myRequests">My Requests</Link>
            <Link to="#allRequests">All Requests</Link>
            <Link to="#accountSettings">Account Settings</Link>
          </form>
        </section>
      </div>
    </div>
  )
}
