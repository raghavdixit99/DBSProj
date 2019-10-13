const express = require('express');
require 'index.html'
const app = express();

// create the homepage route at '/'
app.get('/', (req, res) => {
    res.sendFile('index.html');
  })

//