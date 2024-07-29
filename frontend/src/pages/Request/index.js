import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Logon() {
  return (
    <div className="">
      <form className="header-container">
        <div className="home">
          <Link to="http://localhost:3000/Menu">StockFlow</Link>
        </div>

        <div className="navigation">
          <Link to="http://localhost:3000/Request">New Requests</Link>
          <Link to="http://localhost:3000/MyRequests">My Requests</Link>
          <Link to="http://localhost:3000/AllRequests">All Requests</Link>
        </div>

        <div className="profile">
          <Link to="http://localhost:3000/Account">Account Settings</Link>
        </div>
      </form>
    </div>
  )
}
