const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { passwordStrength } = require('check-password-strength')

const generateJwt = (id, name, email, role) => {
    return jwt.sign({
        id: id,
        name, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {name, email, password, role} = req.body

        if(!email || !password) {
            return next(ApiError.badRequest("Не задан email или пароль!"))
        }

        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует!"))
        }

        if(passwordStrength(password).id < 2){
            return next(ApiError.badRequest("Пароль слишком простой!"))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password: hashPassword, role})
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.name, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if(!user) {
            return next(ApiError.badRequest("Пользователь с таким email не существует!"))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.badRequest("Неверный пароль!"))
        }

        const token = generateJwt(user.id, user.name, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role)
        return res.json({token})
    }

    async deleteOne(req, res) {
        const rowCount = await User.destroy({
            where: {id: req.user.id }
        })
        return res.json(`Удалено строк: ${rowCount}`)
    }
}

module.exports = new UserController()