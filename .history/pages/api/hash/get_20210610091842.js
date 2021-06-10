import redis from '../../../lib/redis'

export default async function create(req, res) {

    try {
        console.log('@ /api/hash/get')

        const { hash } = req.body

        if(hash && hash.length) {
            const userHashesKey = `user::${email}::hashInfo`;
            const hashInfo = await redis.hget(userHashesKey, hash)
            res.status(200).json({ hashInfo })
        } else {
            const numGlobalHashes = redis.get(`num_hashes`)
            res.status(200).json({ numGlobalHashes }) 
        }
    catch (error) {

    }
}