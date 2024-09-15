const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = {

    async index(request, response) {
        const userExists = await connection('users').findOne(sessionStorage.getItem("ID"));
        return response.json(userExists);
    },


    async create(request, response) {

        //captura os dados para criação de usuário e verifica duplicidade pelo e-mail pessoal
        const { name, password, p_mail, f_mail, picture } = request.body;

        console.log(request.body)
        
        /*const userExists = await connection('users').where("p_mail").first();
        if (userExists) {
            return response.status(422).json({ msg: 'Esse usuário já existe, utilize outre endereço de e-mail pessoal' })
        } */

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

        return response.json({ user_id });
    },

    async update(request, response) {
    
        //assistir a aula para saber como atualizar a partir do frontend
        const userExists = sessionStorage.getItem("ID");
      
        return response.json({userExists})
         
    }


}