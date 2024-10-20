import React, { useState, useEffect } from 'react'
import '../MyRequests/styles.css'
import userImage from '../../../src/user.png'
import api from '../../services/api'
import Navbar from '../../Navbar'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [materials, setMaterials] = useState([])
  const userID = sessionStorage.getItem('id')
  const [refresh, setRefresh] = useState(false)
  const [filterCompleted, setFilterCompleted] = useState(false)

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
  }, [refresh])

  function toggleFilterCompleted() {
    setFilterCompleted(prevState => !prevState) // Toggle the state
    setRefresh(prev => !prev)
  }

  function handleLineTabClick(material_id, step) {
    const value = step
    const onchangeVal = [...materials]

    onchangeVal.forEach((material, i) => {
      if (material.material_id === material_id) {
        if (value === 0 && onchangeVal[i].status === 3) {
          onchangeVal[i].status = 2
        } else if (
          !(
            value === 0 &&
            (onchangeVal[i].status === 1 || onchangeVal[i].status === 2)
          )
        ) {
          onchangeVal[i].status = value
        }
      }
    })
    setMaterials(onchangeVal)
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split('-')
    const shortYear = year.slice(2)
    return `${day}-${month}-${shortYear}`
  }

  function findUser(id) {
    for (let user of users) {
      if (user.user_id === id) {
        return user
      }
    }
    return null
  }

  function findMaterialsUpdated(request_id, operation) {
    const materialsUpdated = {}

    materials.forEach(material => {
      if (material.request_id === request_id) {
        materialsUpdated[material.material_id] = material
        if (operation === 'canceled') {
          materialsUpdated[material.material_id].status = 5
        }
      }
    })

    return materialsUpdated
  }

  function findRequestStep(materialsUpdated) {
    const materialsArray = Object.values(materialsUpdated)
    const allStatus3 = materialsArray.every(obj => obj['status'] === 3)
    const allStatus1 = materialsArray.every(obj => obj['status'] === 1)
    const hasStatus2 = materialsArray.some(obj => obj['status'] === 2)

    if (allStatus3) {
      return 3
    } else if (allStatus1) {
      return 1
    } else if (hasStatus2) {
      return 2
    }
    return null
  }

  function checkAction(user, request, action) {
    if (request.step === 4) {
      alert(
        `Error: RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} was already Confirmed`
      )
      return
    }

    if (request.step === 5) {
      alert(
        `Error: RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} was already Canceled`
      )
      return
    }

    if (user.role === 0 && user.user_id !== request.user_id) {
      alert(
        `Error: User is not owner of RQ-23-${String(
          request.request_id
        ).padStart(5, '0')}`
      )
      return
    }

    return true
  }

  function buildMaterialUpdateEmail(materialsUpdated, request) {
    let htmlContent = `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>StockFlow</h1>        
        <h2>The request RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} was updated.</h2>
        <p>Check below the material list and status updated:</p>        
        <table>
          <thead>
            <tr>              
              <th>SAP Code</th>
              <th>Quantity</th>
              <th>Status</th>              
            </tr>
          </thead>
          <tbody>`

    Object.keys(materialsUpdated).forEach(key => {
      const material = materialsUpdated[key]
      let statusText
      switch (material.status) {
        case 1:
          statusText = 'Requested'
          break
        case 2:
          statusText = 'Available for withdrawal'
          break
        case 3:
          statusText = 'Withdrawal confirmed'
          break
        case 4:
          statusText = 'Withdrawal confirmed - Request concluded'
          break
        default:
          statusText = 'Unknown status'
      }

      htmlContent += `
      <tr>        
        <td>${material.code}</td>
        <td>${material.quantity}</td>
        <td>${statusText}</td>        
      </tr>`
    })

    htmlContent += `
          </tbody>
        </table>
      </body>
    </html>
  `

    return htmlContent
  }

  function buildRequestCanceledEmail(materialsUpdated, request) {
    let htmlContent = `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>StockFlow</h1>        
        <h2>The request RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} was canceled.</h2>
        <p>Check below the material list:</p>        
        <table>
          <thead>
            <tr>              
              <th>SAP Code</th>
              <th>Quantity</th>
              <th>Status</th>              
            </tr>
          </thead>
          <tbody>`

    Object.keys(materialsUpdated).forEach(key => {
      const material = materialsUpdated[key]
      let statusText
      switch (material.status) {
        case 1:
          statusText = 'Requested'
          break
        case 2:
          statusText = 'Available for withdrawal'
          break
        case 3:
          statusText = 'Withdrawal confirmed'
          break
        case 4:
          statusText = 'Withdrawal confirmed - Request concluded'
          break
        case 5:
          statusText = 'Request canceled'
          break
        default:
          statusText = 'Unknown status'
      }

      htmlContent += `
      <tr>        
        <td>${material.code}</td>
        <td>${material.quantity}</td>
        <td>${statusText}</td>        
      </tr>`
    })

    htmlContent += `
          </tbody>
        </table>
        <p>The request RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} was canceled by its owner</p>   
      </body>
    </html>
  `

    return htmlContent
  }

  async function handleNotifyButtonClick(request) {
    const user = findUser(sessionStorage.getItem('id'))

    try {
      if (!checkAction(user, request, 'notify')) return
      const materialsUpdated = findMaterialsUpdated(
        request.request_id,
        'notify'
      )

      request.step = findRequestStep(materialsUpdated)

      await api.put('materials', materialsUpdated)
      await api.put('requests', request)

      const html = buildMaterialUpdateEmail(materialsUpdated, request)

      const mail = {
        to: user.f_mail, //`;${STOREKEEPER DEFAULT E-MAIL}`,
        subject: `Request Status Updated - Reservation: ${request.reservation}`,
        text: `Update`,
        html: html
      }

      await api.post('email', mail)

      setRefresh(prev => !prev)

      alert(
        `Request RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} updated successfully`
      )
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  async function handleCanceledButtonClick(request) {
    const user = findUser(sessionStorage.getItem('id'))

    try {
      if (!checkAction(user, request, 'cancel')) return
      const materialsUpdated = findMaterialsUpdated(
        request.request_id,
        'canceled'
      )

      request.step = 5

      await api.put('materials', materialsUpdated)
      await api.put('requests', request)

      const html = buildRequestCanceledEmail(materialsUpdated, request)

      const mail = {
        to: user.f_mail, //`;${STOREKEEPER DEFAULT E-MAIL}`,
        subject: `Request Canceled - Reservation: ${request.reservation}`,
        text: `Canceled`,
        html: html
      }

      await api.post('email', mail)

      setRefresh(prev => !prev)

      alert(
        `Request RQ-23-${String(request.request_id).padStart(
          5,
          '0'
        )} canceled successfully`
      )
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  return (
    <div className="myrequests-page-container">
      <Navbar />

      <div className="myrequests-container">
        <div className="myrequests-page-top">
          <div className="myrequests-page-description">
            <p>My Requests</p>
          </div>

          <div className="myrequests-filter">
            <input
              type="checkbox"
              checked={!filterCompleted}
              onChange={toggleFilterCompleted}
            ></input>
            <p>Active Only</p>
          </div>
        </div>

        <h1>StockFlow</h1>

        <div className="myrequests-colum1">
          <div className="myrequests-header">
            <h2 className="colum1">Request Number</h2>
            <h2 className="colum2">Reservation</h2>
            <h2 className="colum3">Priority</h2>
            <h2 className="colum4">Step</h2>
            <h2 className="colum5">Date</h2>
            <div className="colum6">
              <h2>Owner</h2>
            </div>
          </div>

          <div className="myrequests-lines">
            {requests
              .filter(request => request.user_id === userID)
              .filter(
                request =>
                  filterCompleted || (request.step !== 4 && request.step !== 5)
              )
              .map(request => (
                <details key={request.request_id} className="details">
                  <summary>
                    <p className="colum1">
                      REQ-23-{String(request.request_id).padStart(5, '0')}
                    </p>
                    <p className="colum2">{request.reservation}</p>
                    <p className="colum3">
                      {request.urgency === 0 ? 'Low' : 'High'}
                    </p>
                    <p className="colum4">STEP {request.step}</p>
                    <p className="colum5">{formatDate(request.date)}</p>
                    <div className="userImage">
                      <img
                        src={userImage}
                        alt="user profile"
                        className="circular-image"
                      />
                    </div>
                    <p className="colum6">
                      {findUser(request.user_id)
                        ? findUser(request.user_id).name
                        : 'NOT FOUND'}
                    </p>
                  </summary>
                  <div className="request-details">
                    {materials
                      .filter(
                        material => material.request_id === request.request_id
                      )
                      .map((material, j) => (
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
                            <h2>Available for Withdrawal?</h2>
                            <div className="tab-buttons">
                              <button
                                type="button"
                                onClick={() =>
                                  handleLineTabClick(material.material_id, 1)
                                }
                                className={
                                  material.status === 1 ? 'active' : ''
                                }
                              >
                                No
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleLineTabClick(material.material_id, 2)
                                }
                                className={
                                  material.status === 2 || material.status === 3
                                    ? 'active'
                                    : ''
                                }
                              >
                                Yes
                              </button>
                            </div>
                          </form>
                          <form>
                            <h2>Withdrawal confirmed?</h2>
                            <div className="tab-buttons">
                              <button
                                type="button"
                                onClick={() =>
                                  handleLineTabClick(material.material_id, 0)
                                }
                                className={
                                  material.status === 2 || material.status === 1
                                    ? 'active'
                                    : ''
                                }
                              >
                                No
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleLineTabClick(material.material_id, 3)
                                }
                                className={
                                  material.status === 3 ? 'active' : ''
                                }
                              >
                                Yes
                              </button>
                            </div>
                          </form>
                        </div>
                      ))}
                    <div className="myrequests-content2">
                      <div className="Comments">
                        <h2>Comments</h2>
                        <input
                          placeholder="Comments"
                          maxLength={150}
                          tabIndex="2"
                          className="myrequest-comments"
                          value={request.comments}
                          readOnly
                        />
                      </div>
                      <div className="Buttons">
                        <button
                          className="Update-notify"
                          onClick={() => handleNotifyButtonClick(request)}
                        >
                          Update and Notify
                        </button>
                        <button
                          className="Cancel-reservation"
                          onClick={() => handleCanceledButtonClick(request)}
                        >
                          Cancel Request
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
