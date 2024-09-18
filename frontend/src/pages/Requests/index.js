import React, { useState, useEffect } from 'react'
import '../Requests/styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import userImage from '../../../src/user.png'
import api from '../../services/api'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [materials, setMaterials] = useState([])
  useEffect(() => {
    api.get('requests').then(response => {
      setRequests(response.data)
    })
    api.get('materials').then(response => {
      setMaterials(response.data)
    })
    api.get('users').then(response => {
      setUsers(response.data)
    })
  }, [])

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
            <h2 className="colum1">Request Number</h2>
            <h2 className="colum2">Reservation</h2>
            <h2 className="colum3">Priority</h2>
            <h2 className="colum4">Step</h2>
            <h2 className="colum5">Date</h2>
            <div className="colum6">
              <h2>Owner</h2>
            </div>
          </div>

          <div className="requests-lines">
            {requests.map(request => (
              <details key={request.request_id} className="details">
                <summary>
                  <p className="colum1">REQ-23-00{request.request_id}</p>
                  <p className="colum2">{request.reservation}</p>
                  <p className="colum3">
                    {request.urgency === 0 ? 'Low' : 'High'}
                  </p>
                  <p className="colum4">STEP {request.step}</p>
                  <p className="colum5">10-DEC-24</p>
                  <div className="userImage">
                    <img src={userImage} className="circular-image" />
                  </div>
                  <p className="colum6">Vinicius Garcia</p>
                </summary>
                <div className="request-details">
                  {materials
                    .filter(
                      material => material.reservation === request.reservation
                    )
                    .map(material => (
                      <div
                        className="request-content"
                        key={material.material_id}
                      >
                        <form>
                          <h2>SAP Code</h2>
                          <input
                            placeholder="610000000"
                            tabIndex="3"
                            name="code"
                            className="request-SAP"
                            value={material.code}
                            readOnly
                          />
                        </form>

                        <form>
                          <h2>Quantity</h2>
                          <input
                            placeholder="XX units"
                            tabIndex="4"
                            name="quantity"
                            className="request-quantity"
                            value={material.quantity}
                            readOnly
                          />
                        </form>
                        <form>
                          <h2>Available for take out?</h2>
                          <div className="tab-buttons">
                            <button type="button">No</button>
                            <button type="button">Yes</button>
                          </div>
                        </form>
                        <form>
                          <h2>Take out confirmed?</h2>
                          <div className="tab-buttons">
                            <button type="button">No</button>
                            <button type="button">Yes</button>
                          </div>
                        </form>
                      </div>
                    ))}
                  <div className="request-content2">
                    <div className="Comments">
                      <h2>Comments</h2>
                      <input
                        placeholder="Comments"
                        maxLength={150}
                        tabIndex="2"
                        className="request-comments"
                        value={request.comments}
                      />
                    </div>
                    <div className="Buttons">
                      <button className="Update-notify">
                        Update and Notify
                      </button>
                      <button className="Confirm-reservation">
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
