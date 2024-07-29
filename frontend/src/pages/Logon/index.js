import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Logon() {
  return (
    <div className="logon-page-container">
      <form className="header-container">
        <div className="home">
          <Link to="http://localhost:3000/">StockFlow</Link>
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

      <div className="logon-container">
        <section className="form-login">
          <form>
            <h1>StockFlow</h1>
            <h2>Login</h2>
            <h3>Enter your e-mail to sign in</h3>
            <input placeholder="email@modec.com" />
            <input placeholder="password" type="password" />
            <button className="button">Login</button>
            <Link to="#home">Forgot password</Link>

            <h4>OR</h4>

            <input placeholder="email@modec.com" />
            <button className="button">Sign up with personal e-mail</button>
          </form>
        </section>
      </div>
    </div>
  )
}
