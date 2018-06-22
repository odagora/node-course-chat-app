//We require the 'path' nodejs method to set the public path.See: 'https://nodejs.org/dist/latest-v8.x/docs/api/path.html':
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(publicPath);

//We import express framework to create the server:
const express = require('express');
var app = express();

//We define to use the 'public' folder as a static asset:
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
