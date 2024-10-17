const connection = require('../database/connection')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

module.exports = {
  async index(request, response) {
    const requests = await connection('users').select('*')
    return response.json(requests)
  },

  async create(request, response) {
    //captura os dados para criação de usuário e verifica duplicidade pelo e-mail pessoal
    const { name, password, p_mail, f_mail, picture } = request.body

    const userExist = await connection('users').where({ p_mail }).first()
    if (userExist) {
      return response.status(422).json({
        msg: 'Personal e-mail already being used by other user.'
      })
    }

    //criptografa a senha do usuário e cria um ID único
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user_id = crypto.randomBytes(4).toString('HEX')

    await connection('users').insert({
      user_id,
      name,
      password: passwordHash,
      p_mail,
      f_mail,
      picture
    })

    return response.json({ user_id })
  },

  async update(request, response) {
    const userExists = sessionStorage.getItem('ID')
    return response.json({ userExists })
  }
}
