const connection = require('../database/connection');
// const crypto = require('crypto');

module.exports={

    async index(request, response) {
        const user_id = request.headers.authorization
                      
        
        const requests = await connection('requests').where('user_id', user_id).select('*');
        return response.json(requests)
    },


    async create(request, response) {
        const { name, password, p_mail, f_email, picture } = request.body;
        const user_id = crypto.randomBytes(4).toString('HEX')
      
        await connection('users').insert({
          user_id,
          name,
          password,
          p_mail,
          f_email,
          picture
        })

        return response.json({ id });

    }
};