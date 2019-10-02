//library
const express = require('express');
const connectDB = require('./config/db');

//apply
const app = express();
connectDB();
//middleware
app.use(express.json({ extended: false }));
//port
const PORT = process.env.PORT || 5000;

//backend routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/portfolio', require('./routes/api/portfolio'));
app.use('/api/transactions', require('./routes/api/transactions'));

//active the server
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));