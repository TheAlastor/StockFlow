import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import api from '../../services/api'

export default function Logon() {
  async function handleLogin(e) {
    e.preventDefault()

    const login = {
      p_mail,
      password
    }

    try {
      const response = await api.get('session', login)
      console.log(login)
      sessionStorage.setItem('id', response.sessionId)
      sessionStorage.setItem('token', response.sessionToken)

      alert(`Login em sucedido. Seu ID de acesso: ${response.dataRequest.id}`)
    } catch (err) {
      alert('Erro no cadastro: ' + err.message)
    }
  }

  const [p_mail, setP_Mail] = useState()
  function inputP_Mail(e) {
    setP_Mail(e.target.value)
  }

  const [password, setPassword] = useState()
  function inputPassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div className="logon-page-container">
      <form className="header-container">
        <div className="home">
          <Link to="http://localhost:3000/">StockFlow</Link>
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

      <div className="logon-container">
        <section className="form-login">
          <form>
            <h1>StockFlow</h1>
            <h2>Login</h2>
            <h3>Enter your e-mail to sign in</h3>
            <input
              placeholder="email@modec.com"
              onChange={e => inputP_Mail(e)}
            />
            <input
              placeholder="password"
              type="password"
              onChange={e => inputPassword(e)}
            />
            <button className="button" onClick={handleLogin}>
              Login
            </button>
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
