import { checkUser } from '/lib/fetcher'

export default async function handler(req, res) {
    let output = []
    // console.log(process.env)
    if (req.method === 'GET') {
        const { user_id } = req.query
        if (user_id) {
            output = await checkUser(user_id)
        } else {
            res.status(400)
        }
    } else {
        res.status(405)
    }
  
    res.status(200).json(output)
}
