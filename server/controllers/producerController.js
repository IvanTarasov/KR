const { Producer } = require("../models/models")
const ApiError = require('../error/ApiError')

class ProducerController {
    async create(req, res) {
        const { name, address } = req.body
        const producer = await Producer.create({name, address})
        return res.json(producer)
    }

    async getAll(req, res) {
        const producers = await Producer.findAll()
        return res.json(producers)
    }

    async getOne(req, res) {
        const {id} = req.params
        const producers = await Producer.findOne({where: {id}})
        return res.json(producers)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const rowCount = await Producer.destroy(
            {
                where: {id}
            }
        )
        return res.json(`Удалено строк: ${rowCount}`)
    }
}

module.exports = new ProducerController()