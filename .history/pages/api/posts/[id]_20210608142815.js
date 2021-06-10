import { faunaQueries } from '@/lib/fauna';

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const post = await faunaQueries.getPost(id);
      res.status(200).json(post);
    } 
    else if (req.method === 'PATCH') {
      const post = await faunaQueries.updatePost(id, req.body);
      res.status(200).json(post);
    }
    else if (req.method === 'DELETE') {
      const post = await faunaQueries.deletePost(id);
      res.status(200).json(post);
    }
    else {
      res
        .status(400)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}