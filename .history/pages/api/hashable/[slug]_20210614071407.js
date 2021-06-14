import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query;

        const destinationData = await redis.hget('aliases', slug)
        const deserializedData = JSON.parse(destinationData)

        res.status(200).json({ message: `Your slug is: ${slug}`, destinationDataObj: deserializedData });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}