import React from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div className="register-page-container">

            <form className="header-container">

                <div className='home'>
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
            <h1>StockFlow</h1>
                <section className="form-register">

                    <div className="register-colum1">
                        <form>
                            <h2>Name</h2>
                            <input placeholder="Name" />
                            <h2>Personal E-mail</h2>
                            <input placeholder="email@modec.com" />
                            <h2>Password</h2>
                            <input placeholder="password" type="password" />
                            <h2>Last Name</h2>
                            <input placeholder="Last Name" />
                        </form>
                    </div>

                    <div className="register-colum2">
                        <form>
                            <h2>Onboard Position E-mail</h2>
                            <input placeholder="email@modec.com" />
                            <h2>Repeat Password</h2>
                            <input placeholder="repeat password" type="password" />

                            <Link to="#home">Forgot password</Link>

                            <h2>This is how your profile will be displayed:</h2>

                            <button className="button">Create Account</button>
                        </form>
                    </div>

                </section>
            </div>
        </div>


    )
}
