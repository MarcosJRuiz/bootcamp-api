import fs from 'fs'
const path = './users.json'

export default function validatePut(req, res, next) {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    let index = arrayUsers.findIndex(user => user.nome === req.body.nome)

    if (index === -1) {
        return res.status(404).send("Usuário não encontrado.")
    }

    let {idade, sexo, hobby} =  arrayUsers[index]

    if(idade === req.body.idade && sexo === req.body.sexo && hobby === req.body.hobby) {
        return res.status(409).send("Os dados de atualização são os mesmos já cadastrados para o usuário.")
    }

    next()
}