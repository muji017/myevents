const express = require('express')
const eventController = require('../controllers/eventController')
const eventRoute = express()

const bodyparser = require('body-parser');
eventRoute.use(bodyparser.json());
eventRoute.use(bodyparser.urlencoded({ extended: true }));


const multer= require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function(req, _file, callb) {
        callb(null, path.join('./public'));
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload =multer({storage:storage});

eventRoute.get('/events',eventController.getEvents)
eventRoute.post('/events',upload.array('images'),eventController.addEvents)
eventRoute.delete('/deleteEvent',eventController.deleteEvent)
eventRoute.get('/getEventsDatewise',eventController.getEventDatewise)
eventRoute.get('/getLocationwise',eventController.getLocationwise)
eventRoute.get('/getAudiencewise',eventController.getAudiencewise)

module.exports = eventRoute;