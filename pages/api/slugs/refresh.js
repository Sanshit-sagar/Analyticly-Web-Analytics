

export default async function handler(req, res) {
    console.log('HEEEREEE!!')

    const { email } = req.body;

    console.log(`Getting clicks for user: ${email}`)

    fetch(`https://analyticly.hashably.workers.dev/api/${email}`,  {
        method: 'GET',
    })
    .then((response) => {
        console.log(`${response}`); 
        res.status(200).json({ response });
    })
    .catch((error) => {
        console.log('error', error)
        res.status(500).json({ error });
    });
}
