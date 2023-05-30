
export default function validateBody(req, res, next) {
    let message400 = []

    if (!req.body.nome) {
        message400.push('nome')
    }

    if (!req.body.idade) {
        message400.push(' idade')
    }

    if (!req.body.sexo) {
        message400.push(' sexo')
    }

    if (message400.length !== 0) {
        return res.status(400).send(`É obrigatório informar o valor do(s) campo(s): ${message400}.`)
    }

    if (req.body.nome.match(/[^a-zA-ZÀ-ú\s]/)) {
        return res.status(422).send('O valor do campo nome não deve conter números nem caracteres especiais.')
    }

    if (!Number.isInteger(req.body.idade)) {
        return res.status(422).send('O valor do campo idade deve ser alfanumérico.')
    }

    if (req.body.idade < 18) {
        return res.status(422).send('A idade mínima do usuário é de 18 anos.')
    }

    if (!(req.body.sexo === "masculino" || req.body.sexo === "feminino")) {
        return res.status(422).send('O sexo deve ser masculino ou feminino.')
    }

    let hobbyLength = req.body.hobby.length

    if(hobbyLength > 100) {
        return res.status(422).send(`O limite do valor do campo hobby é de 100 caracteres. O valor inserido contém ${hobbyLength} caracteres.`)
    }

    next()
}