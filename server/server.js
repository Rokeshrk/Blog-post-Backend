const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json());


app.get("/",(req, res) => {
    res.json("Hello");
  
});


app.use('/api/posts', require('./routes/api/posts'));



app.listen(9000, () => console.log(`Server started...`));
