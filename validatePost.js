import fs from 'fs'
const path = './users.json'

export default function validatePost(req, res, next) {
    let data = fs.readFileSync(path, 'utf-8')
    let arrayUsers = JSON.parse(data)

    for (let i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].nome === req.body.nome) {
            return res.status(422).send('Nome de usuário já cadastrado.')
        }
    }

    next()
}