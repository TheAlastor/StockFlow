import React, { useState } from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import userImage from 'C:/Users/Vinicius/Desktop/StockFlow/frontend/src/user.png'

export default function Register() {
    

    /////////////// Get First and Last Name for Profile Preview /////
    const getLastWord = (phrase) => {
        const words = phrase.trim().split(' ');
        return words[words.length - 1];
    };

    const getFirstWord = (phrase) => {
        return phrase.split(' ')[0];
    };

    /////////////// Change Last Name of Profile Preview /////
    const [nameInput, setNameInput] = useState()
    function handleInputNameChange(e) {        
        setNameInput(getFirstWord(e.target.value))
    }

    ////////////////// Change Name of Profile Preview ////////
    const [lastNameInput, setLastNameInput] = useState()
    function handleInputLastNameChange(e) {        
        setLastNameInput(getLastWord(e.target.value))
    }

    ////////////////// Call Input Image ///////////////////////
    const [file, setFile] = useState(userImage)
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    function handleButtonClick() {
        document.getElementById('actual-btn').click()
    }

    /////////////////////////////////////////////////////////


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
                    <Link to="#profile">Profile</Link>
                </div>
            </form>

            <div className="register-container">
                <h1>StockFlow </h1>
                <section className="form-register">
                    <div className="register-colum1">
                        <form>
                            <h2>Name</h2>
                            <input placeholder="Name" onChange={handleInputNameChange} />
                            <h2>Personal E-mail</h2>
                            <input placeholder="email@modec.com" />
                            <h2>Password</h2>
                            <input placeholder="password" type="password" />
                        </form>
                    </div>

                    <div className="register-colum2">
                        <form>
                            <h2>Last Name</h2>
                            <input placeholder="Last Name" onChange={handleInputLastNameChange} />
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
                            <img src={file} className="circular-image" />
                        </div>

                        <div className="user-name">
                            <form>
                                <h3>{nameInput} {lastNameInput}</h3>                                
                            </form>
                        </div>

                    </div>

                    <button className="button-upload" onClick={handleButtonClick}>
                        Upload<br></br>
                        Photo<br></br>
                    </button>
                </div>
                <button className="button-create">Create Account</button>
            </div>
        </div>
    )
}
