const express = require('express')
const OngController = require('./controllers/OngController');
const UserController = require('./controllers/UserController');
const RequestController = require('./controllers/RequestControler');
const ProfileController = require('./controllers/ProfileController');
// const { request } = require('http')
// const { response } = require('express')


const routes = express.Router()

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index)

routes.post('/users', UserController.create);
routes.get('/users', UserController.index)

routes.post('/requests', RequestController.create);
routes.get('/requests', RequestController.index)

routes.get('/profile', ProfileController.index)

function checkToken(request, response, next){
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return response.status(401).json({msg: 'Acesso negado!'})
    }
    
    try{
        const secret = process.env.secret
        jwt.verify(token, secret)
        next()
    }
    catch(error){
    response.status(400).json({msg: 'Usuário não autorizado'})
    }
}



module.exports = routes
