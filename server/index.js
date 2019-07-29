const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = 3000;
const {getAllTasks} = require('../data/data.js');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/data', (req,res) => {
  getAllTasks()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});

