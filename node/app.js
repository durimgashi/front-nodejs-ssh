const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).json([{
        firstName: 'fisnik',
        lastName: 'endrin'
    },
    {
        firstName: 'durim',
        lastName: 'gashi'r
        
    }])
});

module.exports = app;