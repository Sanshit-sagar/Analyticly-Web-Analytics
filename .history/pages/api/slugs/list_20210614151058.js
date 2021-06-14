import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        // const { email } = req.query

        var userSlugs = []; 
        var allSlugs = await redis.hgetall('aliases')

        

        res.status(200).json({ allSlugs, slugs: allSlugs }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}