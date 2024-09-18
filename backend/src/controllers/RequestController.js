const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const requests = await connection('requests').select('*')
    return response.json(requests)
  },

  async create(request, response) {
    //captura os dados para criação de solicitação
    const { reservation, urgency, comments, step } = request.body
    console.log(request)
    const user_id = request.headers.authorization

    const [id] = await connection('requests').insert({
      reservation,
      urgency,
      comments,
      step,
      user_id
    })

    return response.json({ id })
  }
}
