import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import api from '../../services/api'
import Navbar from '../../Navbar'

export default function Logon() {
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    const login = {
      p_mail,
      password
    }

    try {
      const response = await api.post('session', login)

      sessionStorage.setItem('id', response.data.sessionId)
      
      sessionStorage.setItem('token', response.data.sessionToken)
      
      sessionStorage.setItem('name', response.data.name)
      
      sessionStorage.setItem('picture', response.data.picture)

      alert(`Login em sucedido. Seu ID de acesso: ${response.data.sessionId}`)
      navigate('/Menu')
    } catch (err) {
      alert('Falha no login: ' + err.response.data.msg)
    }
  }

  const [p_mail, setP_Mail] = useState('None')
  function inputP_Mail(e) {
    setP_Mail(e.target.value)
  }

  const [password, setPassword] = useState('None')
  function inputPassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div className="logon-page-container">
      <Navbar />
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
            <Link to="Recover" className="forgot-password">
              Forgot password
            </Link>

            <h4>OR</h4>

            <input placeholder="email@modec.com" />

            <Link to="Register" className="link-wrapper">
              <button className="button">Sign up with personal e-mail</button>
            </Link>
          </form>
        </section>
      </div>
    </div>
  )
}
