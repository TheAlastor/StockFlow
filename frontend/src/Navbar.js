import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <form className="header-container">
      <div className="home">
        <Link to="/Menu">StockFlow</Link>
      </div>

      <div className="navigation">
        <Link to="/NewRequest">New Requests</Link>
        <Link to="/MyRequests">My Requests</Link>
        <Link to="/Requests">All Requests</Link>
      </div>

      <div className="profile">
        <Link onClick={sessionStorage.clear()} to="/Login">
          Log Out
        </Link>
      </div>
    </form>
  )
}
export default Navbar
