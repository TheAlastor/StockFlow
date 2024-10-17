import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/Login') // Navigate to the Login page after logout
  }


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
        <Link onClick={handleLogout}>
          Log Out
        </Link>
      </div>
    </form>
  )
}
export default Navbar
