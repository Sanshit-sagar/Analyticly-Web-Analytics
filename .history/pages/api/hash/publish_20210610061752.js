import redis from '../../../lib/redis'

export default async function create(req, res) {
    try {
        var response = ''
        const { hash, email, content } = req.body

        if(!hash.length || !isValid(email)) {
            res.status(400).json({ error: 'invalid input' })
        }


        const hashablesKey = `hashable:${hash}`
        const viewsKey = `views::${hash}`
        const userHashesKey = `user::${email}::hashes` 

        const serializedContent =  JSON.stringify(content)

        const pipeline = await redis.pipeline();
        pipeline.sadd(hashablesKey, hash);
        pipeline.hset(userHashesKey, serializedContent);
        pipeline.hset(viewsKey, 0);
        // pipeline.zadd(hashablesKey, initialScore, hash);
        // increment user posts, total posts
        pipeline.exec((err, results) => {
            // err is always null
            response = JSON.stringify({ queuedResults: results })
        });
          
        res.status(200).json({ didPublish: true, error: null, message: response })
    } catch (error) {
        res.status(400).json({ didPublish: false, error: error.message })
    }
}

const isValid = (email) => {
    return (email.length > 5)
}
// const hash = `hashable:${hash}`
// redis.pipeline()
    // redis.sadd(hashables, hash)
    // redis.hset(hash, JSON.stringify({ user: email, destination: destinationUrl }))