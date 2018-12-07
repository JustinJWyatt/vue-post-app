const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await loadPosts();

  res.send(await posts.find({}).toArray());
});


async function loadPosts(){
  const client = await mongodb.MongoClient.connect('mongodb://abc123:abc123@ds127954.mlab.com:27954/vue-post', {
    useNewUrlParser: true
  });

  return client.db('vue-post').collection('posts');
}

module.exports = router;