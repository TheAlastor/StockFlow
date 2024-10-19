import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import api from '../../services/api'
import Navbar from '../../Navbar'

export default function Recover() {
  const navigate = useNavigate()

  const [p_mail, setP_Mail] = useState('None')
  function inputP_Mail(e) {    
    setP_Mail(e.target.value)    
  }

  async function handleRecover(e) {
    e.preventDefault()

    const recover = { p_mail: p_mail }

    try {
      
      const response = await api.put('email', recover)
           
      alert(response.data.msg)      
    } catch (err) {
      alert('Error: ' + err.response.data.msg)
    }
  }

  return (
    <div className="logon-page-container">
      <Navbar />
      <div className="logon-container">
        <section className="form-login">
          <form>
            <h1>StockFlow</h1>
            <h2>Recover Password</h2>
            <h3>Enter your persornal e-mail to retrieve password</h3>
            <input
              placeholder="email@domain.com"
              onChange={e => inputP_Mail(e)}
            />

            <button className="button" onClick={handleRecover}>
              Recover
            </button>
            <h3>A new password will be sent to your e-mail</h3>
          </form>
        </section>
      </div>
    </div>
  )
}
