import redis from '../../../lib/redis'

export default async function handle(req, res) {
    const { email } = req.query; 
    let userLinks = []; 

    try {  
        if(email?.length) {
            let userLinksListRaw = await redis.hgetall(`aliases::${email}`);
            let userLinksList = Object.values(userLinksListRaw).sort((a, b) => parseInt(JSON.parse(b).timestamp) - parseInt(JSON.parse(a).timestamp));
            
            userLinksList.map(function(value, index) {
                let linkInfo = JSON.parse(value); 
                let dateRaw = linkInfo.config.timestamp || linkInfo.createdAt || linkInfo.timestamp;
                let expiryStr = new Date(parseInt(linkInfo.config.ttl)).toLocaleString(); 
                let lifetime = parseInt(linkInfo.config.ttl) - parseInt(dateRaw); 
                let lifeleft = parseInt(linkInfo.config.ttl) - parseInt(new Date().getTime().toString()); 
                let lifeleftPct = lifeleft > 0 ? Math.floor((lifeleft/lifetime)*100) : 0;

                if(`${parseInt(linkInfo.config.ttl)}` === 'NaN') {
                    lifeleftPct = '100';
                }

                userLinks.push({
                    'id': `${index}`,
                    'slug': `${linkInfo.slug}`,
                    'timestamp': parseInt(dateRaw),
                    'datetime': `${new Date(parseInt(dateRaw)).toLocaleString()}`,
                    'lifetime': `${lifetime}`,
                    'lifeleft': `${lifeleft}`,
                    'expiry': parseInt(linkInfo.config.ttl),
                    'lifeleftPct': `${lifeleftPct}`,
                    'destination': `${linkInfo.url}`,
                    'expiration': `${expiryStr}`,
                    'password': `${linkInfo.config.password}`,
                    'routingStatus': `${linkInfo.config.routingStatus}`,
                    'blacklist': JSON.stringify(linkInfo.config.blacklist),
                    // 'seoTags': JSON.stringify([...linkInfo.config.seoTags]),
                    'views': `${linkInfo.slug}`,
                    'ts': `${linkInfo.timestamp}`,
                }); 
            });

            let links = userLinks.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
            res.status(200).json({ 'links': links });
        } else {
            res.status(401).json({ error: 'Incorrect parameters provided' });
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` });
    }
}