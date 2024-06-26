import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Logon() {
  return (
    <div className="logon-page-container">
      <div className="header-container">
        <section className="home-link">
          <Link to="http://localhost:3000/">StockFlow</Link>
        </section>
        <section className="navigation">
          <Link to="#home">Home</Link>
          <Link to="#news">News</Link>
          <Link to="#contact">Contact</Link>
          <Link to="#about">About</Link>
        </section>
        <section className="profile">teste</section>
      </div>

      <div className="logon-container">
        <section className="form">
          <form>
            <h1>StockFlow</h1>
            <h2>Login</h2>
            <h3>Enter your e-mail to sign in</h3>
            <input placeholder="email@modec.com" />
            <input placeholder="password" type="password" />
            <button className="button">Login</button>
            <Link to="#home">Forgot password</Link>
            <h5>OR</h5>
            <FiLogIn size={16} color="blue" />
            <input placeholder="email@modec.com" />
            <button className="button">Sign up with personal e-mail</button>
          </form>
        </section>
      </div>
    </div>
  )
}
