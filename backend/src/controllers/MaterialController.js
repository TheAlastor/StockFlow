const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const materials = await connection('materials').select('*')
    return response.json(materials)
  },

  async create(request, response) {
    const dataMaterial = request.body

    await connection('materials').insert(dataMaterial)
    return response.json({ dataMaterial })
  },

  async put(request, response) {
    const materialsUpdated = Object.values(request.body);
    
    for (const material of materialsUpdated) {
      await connection('materials')
        .where('material_id', material.material_id)
        .update({
          status: material.status,
        });
    }

      return response.json({ message: 'Materials updated successfully' });
    },   
    

    
  }





