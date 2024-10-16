import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
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
            <Link to="http://localhost:3000/NewRequest">
              Create New Request
            </Link>
            <Link to="#myRequests">My Requests</Link>
            <Link to="#allRequests">All Requests</Link>
            <Link to="#accountSettings">Account Settings</Link>
          </form>
        </section>
      </div>
    </div>
  )
}
