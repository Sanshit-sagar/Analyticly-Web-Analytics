import { faunaQueries } from '@/lib/fauna';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { size = 10, cursor = undefined, author = '' } = req.query;
      const posts = await faunaQueries.getPosts({
        author,
        size, //pageSize
        // /!\ should pass a FaunaDB Query Expression to the cursor (after)
        // use 'Expr' from faunadb-js to convert query param to Expression
        after: faunaQueries.toExpr(cursor),
      });
      res.status(200).json(posts);
    }
    else if (req.method === 'POST') {
      const post = await faunaQueries.createPost(req.body);
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
