const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production

if(process.env.NODE_ENV === 'production'){
  //static folder
  app.use(express.static(__dirname + '/public'));

  //handle SPA
  app.get(/.*/,  (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));