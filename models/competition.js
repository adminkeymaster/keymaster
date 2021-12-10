const mongoose = require('mongoose');

const competition = new mongoose.Schema({

    htmlText: { type: String, required: true },
    photoLink: { type: String, required: true },

    competitions: [{
        endDate: { type: String, required: true },
        startDate: { type: String, required: true },
        description: {type: String, required: true},
        location: { type: String, required: true },
        newsLink: { type: String }
    }]
    
})

module.exports = mongoose.models.competition || mongoose.model('competition', competition);