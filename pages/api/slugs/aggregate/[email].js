
import redis from '../../../../lib/redis'


function extractFields(fields) {
    let ip = fields.visitor?.ip || ''; 
    let country = fields.geodata?.country || '';
    let destination = fields.destination || ''; 

    return { ip, country, destination };
}



export default async function handler(req, res) {

    let ips = {};
    let countries = {};
    let destinations = {};
    let allMaps = { ips, countries, destinations }

    try {
        const { email } = req.query 

        if(!email) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            var clickstreamRaw = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    
            let clickstream = []
            clickstreamRaw.map(function(value, index) {
                let fields = JSON.parse(value);
                
                let { ip, country, destination } = extractFields(fields) 
                
                // await redis.hget('aliases', slug)
                clickstream.push({ index, fields });
            });
            res.status(200).json({ ...allMaps, clickstream })
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` })
    } 
}