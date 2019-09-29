const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Step one, build up server'));

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));