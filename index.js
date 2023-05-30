import express, { json } from "express";
import fs from 'fs'
import validateBody from "./validateBody.js";
import validatePost from "./validatePost.js";
import validatePut from "./validatePut.js"
import validateDelete from "./validateDelete.js";

const path = './users.json'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send(`
    <h2>Bem vindo a nossa api do Bootcamp de QA da Sysmap!</h2>Esta é uma api de cadastro de usuário contendo 4 campos.</br>Segue abaixo os campos e regras de preenchimento:</br>
    <p><b>nome:</b> valor contendo somente letras</br><b>idade:</b> valor contendo somente números</br><b>sexo:</b> valor contendo somente letras </br><b>hobby:</b> valor contendo qualquer tipo de caracter, com limitação de 100 caracteres</br></p>
    <h2>Contrato</h2><p><b>Metodo:</b> GET</br><b>URL:</b> http://localhost:3000/users </br></p>
    <p><b>Metodo:</b> POST / PUT </br><b>URL:</b> http://localhost:3000/user</br><b>header:</b> Content-Type = <i>application/json</i></br><b>Boby:</b> Campos e Valores em formato <a href="http://localhost:3000/json">json</a></br></p>
    <p><b>Metodo:</b> DELETE</br><b>URL:</b> http://localhost:3000/user</br><b>header:</b> Content-Type = <i>application/json</i></br><b>Boby:</b> Campo e Valor em formato <a href="http://localhost:3000/json">json</a></br></p>    
    `)
})

app.get('/json', (req, res) => {
    // res.status(200).send('')
    res.status(200).send(`
    <a href="http://localhost:3000/">retornar</a>
    <h2>Exemplo do body em formato json!</h2>
    {</br> "nome":  ,</br> "idade":  ,</br> "sexo":  ,</br> "hobby":  </br>}
    `)
})

app.get('/users', (req, res) => {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    res.status(200).json(arrayUsers)
})

app.post('/user', validatePost, validateBody, (req, res) => {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    arrayUsers.push(req.body)

    fs.writeFileSync(path, JSON.stringify(arrayUsers))
    res.status(201).send("Usuário cadastrado com sucesso!")
})

app.put('/user', validatePut, validateBody, (req, res) => {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    let index = arrayUsers.findIndex(user => user.nome === req.body.nome)
    arrayUsers[index] = req.body

    fs.writeFileSync(path, JSON.stringify(arrayUsers))
    res.status(200).send("Usuário alterado com sucesso!")
})

app.delete('/user', validateDelete, (req, res) => {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    let index = arrayUsers.findIndex(user => user.nome === req.body.nome)
    arrayUsers.splice(index, 1)

    fs.writeFileSync(path, JSON.stringify(arrayUsers))
    res.sendStatus(204)
})

app.listen(3000, () => {
    console.log(`
\u001b[32m#################################################
#  \u001b[0m       \u001b[1m    P A R A B É N S !!!!   \u001b[0m        \u001b[32m   #
#-----------------------------------------------#
#  \u001b[0mSua API foi ativada com sucesso. \u001b[32m            #
#  \u001b[0mNão feche esta janela para mantê-la ativa. \u001b[32m  #
#  \u001b[0mAgora acesse pelo browser o link abaixo:   \u001b[32m  #
#  \u001b[0mhttp://localhost:3000/           \u001b[32m            #
################################################# 

`)
})