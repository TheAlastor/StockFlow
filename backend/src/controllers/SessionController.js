const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import api from '../../services/api'
require('dotenv').config()

module.exports = {
  async index(request, response) {
    const { p_mail, password } = request.body

    const userExist = await connection('users').where({ p_mail }).first()

    if (!userExist) {
      return response.status(400).json({
        msg: 'This user do not exists. Try another personal e-mail.'
      })
    }

    const checkPassword = await bcrypt.compare(password, userExist.password)

    if (!checkPassword) {
      return response.status(422).json({ msg: 'Wrong password.' })
    }

    const secret = process.env.SECRET
    const sessionToken = jwt.sign({ id: userExist.user_id }, secret)
    const sessionId = userExist.user_id
    const name = userExist.name
    const picture = userExist.picture

    const session = {
      sessionId,
      sessionToken,
      name,
      picture
    }

    return response.json(session)
  },

  async recover(request, response) {
    const { p_mail, password } = request.body

    const userExist = await connection('users').where({ p_mail }).first()

    if (!userExist) {
      return response.status(400).json({
        msg: 'Error: This user do not exists. Try another personal e-mail.'
      })
    } else {
      const newPassword = crypto.randomBytes(4).toString('HEX')

      const html = buildMaterialUpdateEmail(newPassword)

      const mail = {
        to: `{user.p_mail}`,
        subject: `Stock Flow - Password recover requested`,
        text: `Recover`,
        html: html
      }

      await api.post('email', mail)

      return response.status(400).json({
        msg: 'A new password has just been sent to your personal e-mail.'
      })
    }

    function buildMaterialUpdateEmail(newPassword) {
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
          <h2>The password has been reset to:</h2>             
          <h2>${newPassword}</h2>
        </body>
      </html>
    `

      return htmlContent
    }
  },

  async logout(request, response) {
    sessionStorage.clear()
  }
}
