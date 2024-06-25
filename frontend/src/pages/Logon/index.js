import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'

export default function Logon() {
  return (
    <div className="logon-page-container">
      <div className="header-container">
        <section className="navigation">
          <a class="active" href="#home">
            Home
          </a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
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
            <input placeholder="password" />
            <button className="button">Login</button>
            <a>Forgot password</a>
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
