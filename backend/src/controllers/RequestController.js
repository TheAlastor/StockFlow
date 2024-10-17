const knex = require('knex')
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const requests = await connection('requests')
      .leftJoin('materials', 'requests.request_id', 'materials.request_id')
      .select(
        '*',
        connection.raw(`
          json_group_array(
            json_object(
              'material_id', materials.material_id, 
              'code', materials.code, 
              'quantity', materials.quantity, 
              'status', materials.status
            )
          ) AS materials
        `)
      )
      .groupBy('requests.request_id')

    const parsedRequests = requests.map(request => ({
      ...request,
      materials: JSON.parse(request.materials) // Convert the materials string into an array
    }))

    return response.json(parsedRequests)
  },

  async create(request, response) {
    //captura os dados para criação de solicitação
    const { reservation, urgency, comments, step, date } = request.body
    console.log(request)
    const user_id = request.headers.authorization

    const [request_id] = await connection('requests').insert({
      reservation,
      urgency,
      comments,
      step,
      user_id,
      date
    })

    return response.json({ request_id })
  },

  async put(request, response) {
    const { step, request_id } = request.body

    await connection('requests').where('request_id', request_id).update({
      step: step
    })

    return response.json({ message: 'Request updated successfully' })
  }
}
