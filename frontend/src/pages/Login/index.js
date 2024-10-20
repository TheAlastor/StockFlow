import './styles.css'
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

      alert(`Login successful`)
      navigate('/Menu')
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg)
      } else if (error.request) {
        alert('Server is unreachable. Please try again later.')
      } else {
        alert('An unexpected error occurred: ' + error.message)
      }
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
              placeholder="email@domain.com"
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

            <Link to="Register" className="link-wrapper">
              <button className="button">Sign up with personal e-mail</button>
            </Link>
          </form>
        </section>
      </div>
    </div>
  )
}
