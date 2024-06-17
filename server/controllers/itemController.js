const uuid = require('uuid')
const path = require('path')
const {Item, Property} = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, producerId, props} = req.body
            let {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            const item = await Item.create({name, price, typeId, producerId, img: filename})

            if(props){
                console.log(props)
                props = JSON.parse(props)
                props.forEach(p => {
                    Property.create({
                        title: p.title,
                        description: p.description,
                        itemId: item.id
                    })
                });
            }

            
            return res.json(item)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        let {typeId, producerId, limit, page} = req.query

        page = page || 1
        limit = limit || 9
        const offset = page * limit - limit

        let items
        if(!typeId && !producerId) {
            items = await Item.findAndCountAll({limit, offset})
        }
        if(!typeId && producerId) {
            items = await Item.findAndCountAll({where: {producerId}, limit, offset})
        }
        if(typeId && !producerId) {
            items = await Item.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(typeId && producerId) {
            items = await Item.findAndCountAll({where: {typeId, producerId}, limit, offset})
        }

        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findAll(
            {
            where: {id},
            include: [{model: Property, as: 'props'}]
            }
        )

        return res.json(item)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const rowCount = await Item.destroy(
            {
                where: {id}
            }
        )
        return res.json(`Удалено строк: ${rowCount}`)
    }
}

module.exports = new ItemController()