const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

/* 
GET:  buscar/listar info do back end
POST: Cria informação no backend
PUT: alterar uma informação no backend
DELETE: deletar info do backend

QUERY PARAMS: Parâmetros nomeados enviados na rota após ? (Filros, paginação)
ROUTE PARAMS: Parâmentro utilizadso para identificar recursos
REQUEST BODY: Corpo da requisi~~ao, utilzado para criar ou alterar 

nom install nodemon -D (-D  salva a aplicação como uma dependencia de desenvolvimento e não será enviada para o servidor)

SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
NOSQL: MongoDB, CouchDB, etc

*/





app.listen(3333)
