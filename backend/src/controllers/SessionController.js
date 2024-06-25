const connection = require('../database/connection');
// const crypto = require('crypto');

module.exports={

    
    async index(request, response) {

        // verifica se o usuário existe e verifica, se existir, verifica se a senha está correta

        const {p_mail, password} = request.body
        const userExist = await connection('users').findOne(p_mail);
        if(!userExist){
            return response.status(400).json({msg: 'Esse usuário não existe, utilize outre endereço de e-mail pessoal'})
        }
        
        const checkPassword = await bcrypt.compare(password, userExist.password)
      
        if(!checkPassword) {
            return response.status(422).json({ error: 'Senha invalida'});
        }
        
        // fornece token de autenticação e ID do usuário ao SessionStore se a senha estiver correta        

        try{
            const secret = process.env.SECRET

            const token = jwt.sign({ id: userExist.user_id}, secret);
            response.status(200).json({msg:'Autenticação bem sucedida'});
            sessionStorage.setItem("Token", token);
            sessionStorage.setItem("ID", JSON.parse(userExist.user_id));
        } 
        catch(err){
            console.log(error);
            response.status(500).json({msg:'Aconteceu um erro no servidor'});
        }
        return response.json(user);
    },

    async recover(request, response) {
    // estudar como capturar do front end o e-mail do usuário que foi digitado na textbox
    

    },

    async logout(request, response) {
        
        sessionStorage.clear();
        //mandar o usuário de volta para a página HOME
    
    }




};