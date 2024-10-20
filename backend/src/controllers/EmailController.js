const transporter = require('../config/emailConfig')
const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  // Controller function to handle email-sending logic
  async send(request, response) {
    const { to, subject, text, html } = request.body
    console.log('Sending Email...')

    try {
      await transporter.sendMail({
        from: 'Stock Flow <MV23.stockflow@gmail.com>',
        to,
        subject,
        text,
        html
      })

      return response.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      return response.status(500).json({ error: 'Failed to send email' })
    }
  },

  async recover(request, response) {
    const { p_mail } = request.body

    const userExist = await connection('users').where({ p_mail }).first()

    if (!userExist) {
      return response.status(500).json({
        msg: 'This user do not exists. Try another personal e-mail.'
      })
    } else {
      const newPassword = crypto
        .randomBytes(6)
        .toString('base64')
        .slice(0, 6)
        .toUpperCase()

      const html = buildRecoverPasswordEmail(newPassword)

      await connection('users').where('user_id', userExist.user_id).update({
        password: newPassword
      })

      await transporter.sendMail({
        from: 'Stock Flow <MV23.stockflow@gmail.com>',
        to: p_mail,
        subject: `StockFlow - Password recover requested`,
        text: `Recover`,
        html: html
      })

      return response.status(200).json({
        msg: 'A new password has just been sent to your personal e-mail.'
      })
    }

    function buildRecoverPasswordEmail(newPassword) {
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
          <h2>Your password has been reset to:</h2>             
          <h3>${newPassword}</h3>
        </body>
      </html>
    `
      return htmlContent
    }
  }
}
