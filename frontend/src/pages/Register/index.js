import React, { useState } from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import userImage from '../../../src/user.png'
import api from '../../services/api'
import Navbar from '../../Navbar'

export default function Register() {
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if (repeatPassword != password) {
      alert(`Password not match`)
    } else {
      const dataUser = {
        name: name + ' ' + lastName,
        password,
        p_mail,
        f_mail,
        picture
      }

      try {
        const response = await api.post('users', dataUser)

        alert(`User created successfully. User ID: ${response.data.user_id}`)
        navigate('/login')
      } catch (err) {
        alert('Error: ' + err.response.data.msg)
      }
    }
  }

  /////////////// Get First and Last Name for Profile Preview /////
  const getLastWord = phrase => {
    const words = phrase.trim().split(' ')
    return words[words.length - 1]
  }

  const getFirstWord = phrase => {
    return phrase.split(' ')[0]
  }

  /////////////// Change  Name of Profile Preview /////
  const [name, setName] = useState()
  function handleNameChange(e) {
    setName(getFirstWord(e.target.value))
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [lastName, setLastName] = useState()
  function handleLastNameChange(e) {
    setLastName(getLastWord(e.target.value))
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [p_mail, setPersonalMail] = useState()
  function handlePersonalMailChange(e) {
    setPersonalMail(e.target.value)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [f_mail, setFunctionMail] = useState()
  function handleFunctionMailChange(e) {
    setFunctionMail(e.target.value)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [password, setPassword] = useState()
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [repeatPassword, setRepeatPassword] = useState()
  function handleRepeatPasswordChange(e) {
    setRepeatPassword(e.target.value)
  }

  const [picture, setPicture] = useState(userImage)
  function handlePictureChange(e) {
    setPicture(URL.createObjectURL(e.target.files[0]))
  }

  ////////////////// Call Input Image ///////////////////////
  function handlePhotoButton() {
    document.getElementById('actual-btn').click()
  }

  /////////////////////////////////////////////////////////

  return (
    <div className="register-page-container">
      <Navbar />

      <div className="register-container">
        <h1>StockFlow </h1>
        <section className="form-register">
          <div className="register-colum1">
            <form>
              <h2>Name</h2>
              <input
                placeholder="Name"
                maxLength={10}
                tabIndex="1"
                onChange={handleNameChange}
              />
              <h2>Personal E-mail</h2>
              <input
                placeholder="email@modec.com"
                tabIndex="3"
                onChange={handlePersonalMailChange}
              />
              <h2>Password</h2>
              <input
                placeholder="password"
                type="password"
                tabIndex="4"
                onChange={handlePasswordChange}
              />
            </form>
          </div>

          <div className="register-colum2">
            <form>
              <h2>Last Name</h2>
              <input
                placeholder="Last Name"
                tabIndex="2"
                onChange={handleLastNameChange}
              />
              <h2>Onboard Position E-mail</h2>
              <input
                placeholder="email@modec.com"
                tabIndex="3"
                onChange={handleFunctionMailChange}
              />
              <h2>Repeat Password</h2>
              <input
                placeholder="repeat password"
                type="password"
                tabIndex="5"
                onChange={e => handleRepeatPasswordChange(e)}
              />
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
            onChange={handlePictureChange}
            id="actual-btn"
          />

          <div className="user-profile">
            <div className="user-picture">
              <img src={picture} className="circular-image" />
            </div>

            <div className="user-name">
              <form>
                <h3>
                  {name} {lastName}
                </h3>
              </form>
            </div>
          </div>

          <button className="button-upload" onClick={handlePhotoButton}>
            Upload<br></br>
            Photo<br></br>
          </button>
        </div>
        <button onClick={handleRegister} className="button-create">
          Create Account
        </button>
      </div>
    </div>
  )
}
