import React, { useState } from 'react'
import '../Requests/styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import userImage from '../../../src/user.png'

export default function Requests() {

  const [activeLineTab, setActiveLineTab] = useState('No')
  function handleLineTabClick(tab, i) {
    setActiveLineTab(tab);    
    const name = 'withdraw'
    const value = tab
    const onchangeVal = [...data]
    onchangeVal[i][name] = value    
    setData( 
      
    ) 
  }

  function addLine() {
    setData([...data,{code:"",quantity:"",withdraw:"No"}])
  }

  return (



    <div className="requests-page-container">
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

      <div className="requests-container">
        <h1>StockFlow</h1>

        <div className="requests-colum1">

          <div className="requests-header">
            <h2 className='colum1'>Request Number</h2>
            <h2 className='colum2'>Reservation</h2>
            <h2 className='colum3'>Priority</h2>
            <h2 className='colum4'>Step</h2>
            <h2 className='colum5'>Date</h2>
            <div className="colum6">
              <h2>Owner</h2>
            </div>
          </div>

          { 
          data.map((val, i) =>
          <div className="requests-lines">
            <details>
              <summary>
                <p className='colum1'>REQ-00000-24</p>
                <p className='colum2'>999999</p>
                <p className='colum3'>High</p>
                <p className='colum4'>STEP 1</p>
                <p className='colum5'>10-DEC-24</p>
                <div className="userImage">
                  <img src={userImage} className="circular-image" />
                </div>
                <p className='colum6'>Vinicius Garcia</p>
              </summary>


              <div className="request-content">
                <form>
                  <h2>SAP Code</h2>
                  <input placeholder="610000000" tabIndex="3" name="code" className='request-SAP' />
                </form>

                <form>
                  <h2>Quantity</h2>
                  <input placeholder="XX units" tabIndex="4" name="quantity" className='request-quantity' />
                </form>

                <form>
                  <h2>Already withdraw?</h2>
                  <div className="tab-buttons">
                    <button type="button" onClick={() => handleLineTabClick('No', i)} className={val.withdraw === 'No' ? 'active' : ''}>
                      No
                    </button>
                    <button type="button" onClick={() => handleLineTabClick('Yes', i)} className={val.withdraw === 'Yes' ? 'active' : ''}>
                      Yes
                    </button>
                  </div>
                </form>
              </div>
            </details>

          </div>
)}
        </div>





      </div>
    </div>
  )
}
