const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await loadPosts();

  res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
  const posts = await loadPosts();

  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  const posts = await loadPosts();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
})


async function loadPosts(){
  const client = await mongodb.MongoClient.connect('mongodb://abc123:abc123@ds127954.mlab.com:27954/vue-post', {
    useNewUrlParser: true
  });

  return client.db('vue-post').collection('posts');
}

module.exports = router;