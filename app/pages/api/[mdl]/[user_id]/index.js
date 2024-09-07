import mongo from '/lib/mongo'
import { MDL_SCHEMA } from '/lib/schema/mdl'


export default async function handler(req, res) {
    let output = []
    if (req.method === 'GET') {
        const { mdl, user_id } = req.query
        const filters = {
            user_id,
        }
        if (mdl && user_id) {
            const conn = await mongo.connect()
            const model = conn.models[mdl] || conn.model(mdl, MDL_SCHEMA)
            output = await model.find(
                filters,
            ).limit(10)
        } else {
            res.status(400)  
        }
    }
  
    res.status(200).json(output)
}
