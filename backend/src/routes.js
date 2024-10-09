const express = require('express')

const SessionController = require('./controllers/SessionController')
const UserController = require('./controllers/UserController')
const RequestController = require('./controllers/RequestController')
const MaterialController = require('./controllers/MaterialController')
const ProfileController = require('./controllers/ProfileController')
const EmailController = require('./controllers/EmailController')


const routes = express.Router()

routes.post('/session', SessionController.index)

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/requests', RequestController.create)
routes.get('/requests', RequestController.index)

routes.put('/materials', MaterialController.put)
routes.post('/materials', MaterialController.create)
routes.get('/materials', MaterialController.index)

routes.get('/profile', ProfileController.index)

routes.post('/email', EmailController.send)

function checkToken(request, response, next) {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return response.status(401).json({ msg: 'Acesso negado!' })
  }

  try {
    const secret = process.env.secret
    jwt.verify(token, secret)
    next()
  } catch (error) {
    response.status(400).json({ msg: 'Usuário não autorizado' })
  }
}

module.exports = routes
