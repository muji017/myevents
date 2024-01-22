const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({

    eventName: { type: String, required: true },
    eventDate: { type: Date,  },
    eventTime: { type: String,  },
    location: { type: String,  },
    audiences: [
        { type: String }
    ],
    eventImages: [
        { type: String }
    ],
    details: { type: String },
    isActive: { type: Boolean, default: true }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event