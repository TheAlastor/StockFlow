import React, { useState } from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Logon() {



  const [reservation, setReservation] = useState()
  function inputReservation(e) {
    setReservation(e.target.value)
  }

  const [activeUrgencyTab, setActiveUrgencyTab] = useState('No')
  function handleTabUrgencyClick(tab) {
    setActiveUrgencyTab(tab);
  }


  const [comments, setComments] = useState()
  function inputComments(e) {
    setComments(e.target.value)
  }

  const [data, setData] = useState([{ code:"",quantity:"",withdraw:"No"}])

  function lineChange(e, i) {
    const { name, value } = e.target
    const onchangeVal = [...data]
    onchangeVal[i][name] = value
    setData(onchangeVal)
  }

  const [activeLineTab, setActiveLineTab] =  useState('No')
  function handleLineTabClick(tab, i) {
    setActiveLineTab(tab);    
    const name = 'withdraw'
    const value = tab
    const onchangeVal = [...data]
    onchangeVal[i][name] = value    
    setData(onchangeVal) 
  }

  function addLine() {
    setData([...data,{code:"",quantity:"",withdraw:"No"}])
  }

  function deleteLine(i) {
    const deleteVal = [...data]
    deleteVal.splice(i, 1)
    setData(deleteVal)
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
              <input placeholder="XXXXXX" maxLength={6} tabIndex="1" className='request-reservation' />

            </form>
            <h2>Urgent?</h2>
            <div className="tab-buttons">
              <button onClick={() => handleTabUrgencyClick('No')} className={activeUrgencyTab === 'No' ? 'active' : ''}>
                No
              </button>
              <button onClick={() => handleTabUrgencyClick('Yes')} className={activeUrgencyTab === 'Yes' ? 'active' : ''}>
                Yes
              </button>
            </div>
            <h2>Comments</h2>
            <input placeholder="Enter your observation here (optional)" maxLength={150} tabIndex="2" className='request-comments' />
            <button className="button-create">Submit</button>
          </div>

          <div className="request-colum2">

          { 
          data.map((val, i) =>
            <div className="request-line1" key={i}>
              <form>
                <h2>SAP Code</h2>
                <input
                  placeholder="610000000"
                  tabIndex="3" name="code" value={val.code} onChange={(e) => lineChange(e, i)}
                  className='request-SAP'
                />
              </form>

              <form>
                <h2>Quantity</h2>

                
                <input placeholder="XX units" tabIndex="4" name="quantity" value={val.quantity} onChange={(e) => lineChange(e, i)} className='request-quantity' />
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

              <button  style={{visibility:i<1 ? 'hidden' : 'visible'}} onClick={() => deleteLine(i)} className='deleteLine'>Delete</button>
            </div>
          )}
            <button onClick={addLine} className='addLine'>Add</button>
            
          </div>

          
               
          
        </section>

      </div>
    </div>
  )
}
