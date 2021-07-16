//library
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

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
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/stock', require('./routes/api/stockData'));

//Serve static  assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//active the server
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
