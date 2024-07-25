import React, { useState } from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import userImage from 'C:/Users/vinic/Desktop/StockFlow/frontend/src/user.png'

export default function Register() {
  const [file, setFile] = useState()
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  function handleButtonClick() {
    document.getElementById('actual-btn').click()
  }

  return (
    <div className="register-page-container">
      <form className="header-container">
        <div className="home">
          <Link to="http://localhost:3000/">StockFlow</Link>
        </div>

        <div className="navigation">
          <Link to="#news">News</Link>
          <Link to="#contact">Contact</Link>
          <Link to="#about">About</Link>
        </div>

        <div className="profile">
          <Link to="#profile">wProfile</Link>
        </div>
      </form>

      <div className="register-container">
        <h1>StockFlow </h1>
        <section className="form-register">
          <div className="register-colum1">
            <form>
              <h2>Name</h2>
              <input placeholder="Name" />
              <h2>Personal E-mail</h2>
              <input placeholder="email@modec.com" />
              <h2>Password</h2>
              <input placeholder="password" type="password" />
            </form>
          </div>

          <div className="register-colum2">
            <form>
              <h2>Last Name</h2>
              <input placeholder="Last Name" />
              <h2>Onboard Position E-mail</h2>
              <input placeholder="email@modec.com" />
              <h2>Repeat Password</h2>
              <input placeholder="repeat password" type="password" />
            </form>
          </div>
        </section>

        <div className="register-upload">
          <h3>This is how your profile will be displayed:</h3>

          <input
            placeholder="select image"
            type="file"
            accept="image/*"
            className="picture-input"
            onChange={handleChange}
            id="actual-btn"
          />

          <div className="user-profile">
            <div className="user-picture">
              <img src={userImage} className="circular-image" />
            </div>
            User Name
          </div>

          <button className="button-upload" onClick={handleButtonClick}>
            Upload Photo
          </button>
        </div>
        <button className="button">Create Account</button>
      </div>
    </div>
  )
}
