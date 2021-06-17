import redis from '../../../../lib/redis'

export default async function hash_view(req, res) {
    try {
        const { slug } = req.query

        if(!slug.length) {
            res.status(400).json({ message: 'failure, invalid keys'})
        }
        const hash = slug
        const views = await redis.incrby(`views::${hash}`, 1)
        res.status(200).json({ views });
    } catch (error) {
        res.status(400).json({ error: 'Unable to retrieve view count' })
    }
}