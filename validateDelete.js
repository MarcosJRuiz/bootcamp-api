import fs from 'fs'
const path = './users.json'

export default function validateDelete(req, res, next) {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    let index = arrayUsers.findIndex(user => user.nome === req.body.nome)

    if (index === -1) {
        return res.status(404).send("Usuário não encontrado.")
    }

    next()
}