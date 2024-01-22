const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

const PORT = 3000;
const eventRoute = require('./routes/eventRoute')
app.use('/api', eventRoute)

mongoose.connect('mongodb://0.0.0.0:27017/events')
    .then(
        console.log("Database connected"),
        app.listen(PORT, () => {
            console.log('Server connected on port ' + PORT);
        })
)
