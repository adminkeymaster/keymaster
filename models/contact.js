const mongoose = require('mongoose');


const contactInfo = new mongoose.Schema({

    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
})

module.exports = mongoose.models.contactInfo || mongoose.model('contactInfo', contactInfo);