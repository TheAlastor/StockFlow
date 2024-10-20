const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  async create(request, response) {
    try {
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

      return response.status(200).json(session)
    } catch (error) {
      console.error('Error sending email:', error)
      return response.status(500).json({ msg: error })
    }
  }
}
