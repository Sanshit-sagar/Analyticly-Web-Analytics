import redis from '../../../../lib/redis'
import axios from 'axios'
var parser = require('ua-parser-js');

// const baseUrl = `https://analyticly.hashably.workers.dev`

// import { formatAndSortClicks } from '../../clicks/[email]'

// async function getFormattedClicks(email) {
//     const fetchUrl = `${baseUrl}/api/${email}`;
    
//     await axios.get(fetchUrl).then((resp) => {
//         data = formatAndSortClicks(resp.data.clicks);
//         return data;
//     }).catch((error) => { 
//         console.log(`Got an error`); 
//         return []; 
//     });
// }
// keep a cursor of last seen -> maybe clear KV store/DObject once seen, every time then the next batch will be new
// lpush, zadd, up till then
// now the stats are up to date

//INITIALLY JUST RUN THROUGH THE FORMATTED CLICKS, KEEP A MAP AND RETURN THAT FOR THE GRAPHS
//THEN CLEAN UP THE APII!!

function incrementMap(frequencyMap, field) {
    if(frequencyMap && frequencyMap[field]) {
        frequencyMap[field] += 1
    } else {
        frequencyMap[field] = 1; 
    }
}
    

export default async function handler(req, res) {
   
    const { email } = req.query
    let destinations = {}; 
    let ips = {};
    let countries = {}; 
    let engines = {};
    let browsers = {}; 
    let operatingSystems = {};

    try {
        if(!email) {
            console.log('No email found');
            res.status(403).json({ Error: 'Bad request! No Email found' })
        } else {
            
            var numUnique = await redis.zcard(`user.${email}.pageviews`)
            var maxViews = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES')
            var totalViews = await redis.llen(`clickstream.user.${email}`)
            var clickstreamRaw = await redis.lrange(`clickstream.user.${email}`, 0, -1) 
            var collection = await redis.hgetall(`aliases::${email}`)
            
            
            const views = {
                numUnique: numUnique || '0',
                maxViews: maxViews[1] || '0',
                totalViews: totalViews || '0',
                numLinks: Object.entries(collection).length || '0'
            }; 

            let mostViewedSlugs = [];
            maxViews.map(function(value, index) {
                if(index%2===0) {
                    mostViewedSlugs.push([
                        value, 
                        maxViews[index + 1] 
                    ]);
                }
            })

            let clickstream = [];

            clickstreamRaw.map(function(value, idx) {
                let click = JSON.parse(value);

                let ua = parser(click.visitor?.system || '')
                let destUrl = new URL(click.destination)
                let hostname = destUrl.host
                
                clickstream.push({ 
                    'index': click.index,
                    'slug': click.slug,
                    'destination': hostname,
                    'owner': click.owner,
                    'key': click.key || '',
                    'os': ua.os.name,
                    'engine': ua.engine.name,
                    'browser': ua.browser.name,
                    ...click.visitor, 
                    ...click.geodata, 
                    'timeTaken': click.misc.timeTaken,
                    'timestamp': click.misc.finalTimestamp,
                    'localeTime': click.misc.localeTime,
                });

                incrementMap(destinations, hostname);
                incrementMap(ips, click.visitor.ip);
                incrementMap(countries, click.geodata.country);
                incrementMap(engines, ua.engine.name); 
                incrementMap(browsers, ua.browser.name);
                incrementMap(operatingSystems, ua.os.name);
            });

            res.status(200).json({ 
                ...views, 
                clickstream,
                slugsByPopularity: mostViewedSlugs, 
                destinations: generateSortedList(destinations),
                ips: generateSortedList(ips),
                countries: generateSortedList(countries),
                engines: generateSortedList(engines),
                browsers: generateSortedList(browsers),
                operatingSystems: generateSortedList(operatingSystems),
            })
        }
    } catch (error) {
        res.status(500).json({ error: `${error.message}` })
    }
}

export function generateSortedList(column) {
    return Object.entries(column).sort((a, b) => column[b[0]] - column[a[0]]);
}
