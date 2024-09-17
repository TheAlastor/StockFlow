import React, { useState } from 'react'
import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function NewRequest() {
  const userID = localStorage.getItem(id)

  async function handleRegister(e) {
    e.preventDefault()

    const dataMaterialSend = addReservation(dataMaterial, reservation, reservation)

    const step = findStep(dataMaterialSend, "status")  === true ? '3' : '1'

    const dataRequest = {
      reservation,
      urgency,
      comments,
      step      
    }
    
    try {
      const response = await api.post('requests', dataRequest)

      //await api.post('material', dataMaterialSend)

      alert(`Seu ID de acesso: ${response.dataRequest.id}`)
    } 
    
    catch (err) {
      alert('Erro no cadastro: ' + err.message)
    }
  }

  function addReservation(objectsArray, fieldName, valueToAdd) {
    return objectsArray.map(obj => {      
        obj[fieldName] = valueToAdd;      
      return obj;
    });
  }
 
  function findStep(objectsArray, fieldName) {    

  return objectsArray.every(obj => obj[fieldName] === "2");
  }

  const [reservation, setReservation] = useState()
  function inputReservation(e) {
    setReservation(e.target.value)    
  }

  const [urgency, setActiveUrgencyTab] = useState('No')
  function handleTabUrgencyClick(tab) {
    setActiveUrgencyTab(tab === 'Yes' ? '1' : '0')
  }

  const [comments, setComments] = useState()
  function inputComments(e) {
    setComments(e.target.value)
  }

  const [dataMaterial, setMaterialData] = useState([
    { code: '', quantity: '', status: '0', reservation: '' }
  ])

  function lineChange(e, i) {
    const { name, value } = e.target
    const onchangeVal = [...dataMaterial]
    onchangeVal[i][name] = value
    setMaterialData(onchangeVal)
  }

  const [activeLineTab, setActiveLineTab] = useState('No')
  function handleLineTabClick(tab, i) {
    setActiveLineTab(tab)
    const name = 'status'
    const value = tab === 'Yes' ? '2' : '0'
    const onchangeVal = [...dataMaterial]
    onchangeVal[i][name] = value
    setMaterialData(onchangeVal)
  }

  function addLine() {
    setMaterialData([...dataMaterial, { code: '', quantity: '', status: '0' }])
  }

  function deleteLine(i) {
    const deleteVal = [...dataMaterial]
    deleteVal.splice(i, 1)
    setMaterialData(deleteVal)
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
        <h1>StockFlow</h1>
        <section className="form-request">
          <div className="request-colum1">
            <form>
              <h2>Requester</h2>

              <input
                placeholder="User Name"
                className="request-userName"
                value={"userName"}
              />

              <h2>Reservation Number</h2>
              <input
                placeholder="XXXXXXX"
                maxLength={7}
                tabIndex="1"
                className="request-reservation"                
                onChange={e => inputReservation(e)}
              />
            </form>
            <h2>Urgent?</h2>
            <div className="tab-buttons">
              <button
                onClick={() => handleTabUrgencyClick('No')}
                className={urgency === '0' ? 'active' : ''}
              >
                No
              </button>
              <button
                onClick={() => handleTabUrgencyClick('Yes')}
                className={urgency === '1' ? 'active' : ''}
              >
                Yes
              </button>
            </div>
            <h2>Comments</h2>
            <input
              placeholder="Enter your observation here (optional)"
              maxLength={150}
              tabIndex="2"
              className="request-comments"
              onChange={e => inputComments(e)}
            />
            <button onClick={handleRegister} className="button-create">
              Submit
            </button>
          </div>

          <div className="request-colum2">
            {dataMaterial.map((val, i) => (
              <div className="request-line1" key={i}>
                <form>
                  <h2>SAP Code</h2>
                  <input
                    placeholder="610000000"
                    tabIndex="3"
                    name="code"
                    value={val.code}
                    onChange={e => lineChange(e, i)}
                    className="request-SAP"
                  />
                </form>

                <form>
                  <h2>Quantity</h2>

                  <input
                    placeholder="XX units"
                    tabIndex="4"
                    name="quantity"
                    value={val.quantity}
                    onChange={e => lineChange(e, i)}
                    className="request-quantity"
                  />
                </form>

                <form>
                  <h2>Already withdraw?</h2>
                  <div className="tab-buttons">
                    <button
                      type="button"
                      onClick={() => handleLineTabClick('No', i)}
                      className={val.status === '0' ? 'active' : ''}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLineTabClick('Yes', i)}
                      className={val.status === '2' ? 'active' : ''}
                    >
                      Yes
                    </button>
                  </div>
                </form>

                <button
                  style={{ visibility: i < 1 ? 'hidden' : 'visible' }}
                  onClick={() => deleteLine(i)}
                  className="deleteLine"
                >
                  Delete
                </button>
              </div>
            ))}
            <button onClick={addLine} className="addLine">
              Add
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
