const mongoose = require('mongoose');


const ageGroup = new mongoose.Schema({
    
    age: [{
        type: Number,
        required: true
    }]
})

module.exports = mongoose.models.ageGroup || mongoose.model('ageGroup', ageGroup);