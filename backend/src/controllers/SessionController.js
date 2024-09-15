const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  async index(request, response) {
    // verifica se o usuário existe e verifica, se existir, verifica se a senha está correta

    const p_mail = request.body.p_mail
    const password = request.body.password

    const userExist = await connection('users').where({ p_mail }).first()
    const checkPassword = await bcrypt.compare(password, userExist.password)

    if (!userExist) {
      return response.status(400).json({
        msg: 'Esse usuário não existe, utilize outre endereço de e-mail pessoal'
      })
    }

    if (!checkPassword) {
      return response.status(422).json({ error: 'Senha invalida' })
    }

    const sessionId = userExist.user_id
    const secret = 'AAAAAAAAAAAAA'
    const sessionToken = jwt.sign({ id: userExist.user_id }, secret)

    const session = {
      sessionId,
      sessionToken
    }

    return response.json(session)
  },

  async recover(request, response) {
    // estudar como capturar do front end o e-mail do usuário que foi digitado na textbox
  },

  async logout(request, response) {
    sessionStorage.clear()
    //mandar o usuário de volta para a página HOME
  }
}
