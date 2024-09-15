const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const requests = await connection('materials').select('*')
    return response.json(materials)
  },

  async create(request, response) {
    const dataMaterial = request.body
    

    await connection('materials').insert({
      dataMaterial      
    })
  }
}

/*code,
      quantity,
      available,
      delivered,
      request_id */
