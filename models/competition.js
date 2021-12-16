const mongoose = require('mongoose');

const competition = new mongoose.Schema({

    htmlText: { type: String, required: true },
    photoLink: { type: String, required: true },

    competitions: [{
        compName: { type: String, required: true },
        ageGroup: [{
            type: String,
            required: true,
        }],
        type: [{
            type: String,
            required: true
        }],
        endDate: { type: String, required: true },
        startDate: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        newsLink: { type: String }
    }]

})

module.exports = mongoose.models.competition || mongoose.model('competition', competition);