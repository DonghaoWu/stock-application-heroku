const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/transactions', require('./routes/api/transactions'));

app.get('/', (req, res) => res.send('Step one, build up server'));

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));