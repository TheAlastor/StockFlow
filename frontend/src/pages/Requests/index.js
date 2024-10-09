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

  function handleLineTabClick(material_id, step) {
    const value = step
    const onchangeVal = [...materials]

    onchangeVal.forEach((material, i) => {
      if (material.material_id === material_id) {
        if (value == 0 && (onchangeVal[i].status == 3)) {
          onchangeVal[i].status = 2
        }
        else {
          if (value == 0 && (onchangeVal[i].status == 1 || onchangeVal[i].status == 2)) {
            onchangeVal[i].status = onchangeVal[i].status
          } else {
            onchangeVal[i].status = value
          }
        }        
      }
    });
    setMaterials(onchangeVal)
  }

  function findUser(id) {           
    users.forEach(user => {
      if (user.user_id === id) {               
         return user
      }
    })       
  }

  function findMaterialsUpdated(reservation) {     
    const materialsUpdated = {}

    materials.forEach(material => {
      if(material.reservation === reservation){
      materialsUpdated[material.material_id] = material
      }
    })
    
    return materialsUpdated
    }     
  

  async function handleNotifyButtonClick(request) {

    try {

      const materialsUpdated = findMaterialsUpdated(request.reservation);
      const user = findUser(request.user_id);
      
      const response = await api.put('materials', materialsUpdated)

      // const html = createHTML()
    
      const mail = {
        to: user.f_mail,
        subject: `Request Status Updated - Reservation: ${request.reservation}`,
        text: `Your request related to reservation ${request.reservation} has been updated.`,
        html: `<h1>Request Updated</h1><p>Details: ${request.reservation}</p>`,
      }
      //const response2 = await api.post('email', mail);


      alert(
        `Success: ` // ${response} - ${response2} `
      )

    } catch (err) {
      alert('Error: ' + err.response.data.msg)
    }



  }




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
            {requests.map((request) => (
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
                  {materials.filter(material => material.reservation === request.reservation).map((material, j) => (
                    <div className="request-content" key={material.material_id}>
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
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(material.material_id, 1)
                            }
                            className={material.status === 1 ? 'active' : ''}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(material.material_id, 2)
                            }
                            className={
                              material.status === 2 || material.status === 3 ? 'active' : ''
                            }
                          >
                            Yes
                          </button>
                        </div>
                      </form>
                      <form>
                        <h2>Take out confirmed?</h2>
                        <div className="tab-buttons">
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(material.material_id, 0)
                            }
                            className={
                              material.status === 2 || material.status === 1 ? 'active' : ''
                            }
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(material.material_id, 3)
                            }
                            className={material.status === 3 ? 'active' : ''}
                          >
                            Yes
                          </button>
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
                      <button className="Update-notify" onClick={() =>
                        handleNotifyButtonClick(request)
                      }>
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


/*
                <div className="request-details">
                  {request['materials'].map((material, j) => (
                    <div className="request-content" key={material.material_id}>
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
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(i, j, 1)
                            }
                            className={material.status === 1 ? 'active' : ''}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(i, j, 2)
                            }
                            className={
                              material.status === 2 || 3 ? 'active' : ''
                            }
                          >
                            Yes
                          </button>
                        </div>
                      </form>
                      <form>
                        <h2>Take out confirmed?</h2>
                        <div className="tab-buttons">
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(i, j, 2)
                            }
                            className={
                              material.status === 2 || 1 ? 'active' : ''
                            }
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLineTabClick(i, j, 3)
                            }
                            className={material.status === 3 ? 'active' : ''}
                          >
                            Yes
                          </button>
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
                */