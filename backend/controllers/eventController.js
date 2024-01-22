const eventModel = require('../models/eventModel')

// get all events
const getEvents = async (req, res) => {
  try {
    const events = await eventModel.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// add events
const addEvents = async (req, res) => {
  try {
    const event = new eventModel()
    event.eventName = req.body.eventName,
      event.eventDate = req.body.eventDate,
      event.eventTime = req.body.eventTime,
      event.audiences = JSON.parse(req.body.audiences),
      event.eventImages = req.files.map((file) => file.filename),
      event.details = req.body.details,
      event.location = req.body.location,
      event.isActive = true,
      await event.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// delete events
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.query.eventId;
    const result = await eventModel.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// get event datewise only more than five events

const getEventDatewise = async (req, res) => {
  try {
    const result = await eventModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$eventDate' } },
          count: { $sum: 1 },
          events: { $push: '$$ROOT' },
        },
      },
      {
        $match: {
          count: { $gt: 4 },
        },
      },
    ]);
    if (result && result.length > 0) {
      const data = result[0].events || [];
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get locationwise details
const getLocationwise = async (req, res) => {
  try {
    let result = await eventModel.aggregate([
      {
        $group: {
          _id: '$location',
          events: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAudiencewise = async (req, res) => {
  try {
    const result = await eventModel.aggregate([
      {
        $unwind: '$audiences', 
      },
      {
        $group: {
          _id: '$audiences',
          events: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
    ]);
     console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

module.exports = {
  getEvents,
  addEvents,
  deleteEvent,
  getEventDatewise,
  getLocationwise,
  getAudiencewise
}
