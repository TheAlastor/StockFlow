import React, { useState } from 'react'
import '../Request/styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Logon() {


  const [activeTab, setActiveTab] = useState('No')
  function handleTabClick(tab) {
    setActiveTab(tab);    
  }



  return (



    <div className="request-page-container">
      <form className="header-container">
        <div className="home">
          <Link to="http://localhost:3000/Menu">StockFlow</Link>
        </div>

        <div className="navigation">
          <Link to="http://localhost:3000/Request">New Requests</Link>
          <Link to="http://localhost:3000/MyRequests">My Requests</Link>
          <Link to="http://localhost:3000/AllRequests">All Requests</Link>
        </div>

        <div className="profile">
          <Link to="http://localhost:3000/Account">Account Settings</Link>
        </div>
      </form>

      <div className="request-container">
        <h1>StockFlow </h1>
        <section className="form-request">
          <div className="request-colum1">
            <form>
              <h2>Requester</h2>

              <div className="user-requester">
                <h3>
                  User Name
                </h3>
              </div>

              <h2>Reservation Number</h2>
              <input placeholder="XXXXXX" maxLength={6} tabIndex="3" />
              <h2>Urgent?</h2>
            </form>
            <div className="tab-buttons">
                <button onClick={() => handleTabClick('Yes')} className={activeTab === 'Yes' ? 'active' : ''}>
                  Yes
                </button>
                <button onClick={() => handleTabClick('No')} className={activeTab === 'No' ? 'active' : ''}>
                  No
                </button>                
              </div>              
          </div>

          <div className="request-colum2">
            <form>
              <h2>Last Name</h2>
              <input
                placeholder="Last Name"
                tabIndex="2"
              />
              <h2>Onboard Position E-mail</h2>
              <input placeholder="email@modec.com" tabIndex="3" />
              <h2>Repeat Password</h2>
              <input
                placeholder="repeat password"
                type="password"
                tabIndex="5"
              />
            </form>
          </div>
        </section>


        <button className="button-create">Create Account</button>
      </div>



















    </div>
  )
}
