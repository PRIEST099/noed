const express = require('express');
const apiRoutes = require('./routes/initRoutes');
const secretRoutes = require('./routes/secretRoutes');

const app = express();


app.use(express.json());

// Register the API routes
app.use('/app', apiRoutes);
app.use('/secret', secretRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
