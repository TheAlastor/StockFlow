import React, { useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import userImage from '../../../src/user.png'
import api from '../../services/api'
import Navbar from '../../Navbar'

export default function Register() {
  const navigate = useNavigate()

  /////////////// Get First and Last Name for Profile Preview /////
  const getLastWord = phrase => {
    const words = phrase.trim().split(' ')
    return words[words.length - 1]
  }

  const getFirstWord = phrase => {
    return phrase.split(' ')[0]
  }

  /////////////// Change  Name of Profile Preview /////
  const [name, setName] = useState('')
  function handleNameChange(e) {
    let value = getFirstWord(e.target.value)
    const formattedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    setName(formattedValue)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [lastName, setLastName] = useState('')
  function handleLastNameChange(e) {
    let value = getLastWord(e.target.value)
    const formattedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    setLastName(formattedValue)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [p_mail, setPersonalMail] = useState('')
  function handlePersonalMailChange(e) {
    let value = e.target.value
    const formattedValue = value.toLowerCase()
    setPersonalMail(formattedValue)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [f_mail, setFunctionMail] = useState('')
  function handleFunctionMailChange(e) {
    let value = e.target.value
    const formattedValue = value.toLowerCase()
    setFunctionMail(formattedValue)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [password, setPassword] = useState('')
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  ////////////////// Change Last Name of Profile Preview ////////
  const [repeatPassword, setRepeatPassword] = useState('')
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

  function checkInput() {
    if (name === '' || lastName === '') {
      alert(`Name and Last Name can't be empty`)
      return false
    }

    if (p_mail === '' || f_mail === '') {
      alert(`Personal E-mail and Function E-mail can't be empty`)
      return false
    }

    if (repeatPassword === '' || password === '') {
      alert(`Password can't be empty`)
      return false
    }

    if (repeatPassword !== password) {
      alert(`Password not match`)
      return false
    }

    return true
  }

  async function handleRegister(e) {
    e.preventDefault()

    const dataUser = {
      name: name + ' ' + lastName,
      password,
      p_mail,
      f_mail,
      picture
    }

    try {
      if (!checkInput()) return
      const response = await api.post('users', dataUser)

      alert(`User created successfully. User ID: ${response.data.user_id}`)
      navigate('/login')
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
                placeholder="email@domain.com"
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
                maxLength={12}
              />
              <h2>Onboard Position E-mail</h2>
              <input
                placeholder="email@domain.com"
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
              <img
                src={picture}
                alt="User profile"
                className="circular-image"
              />
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
