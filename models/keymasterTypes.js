const mongoose = require('mongoose');


const keymasterTypes = new mongoose.Schema({
    
    keymasterType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.keymasterTypes || mongoose.model('keymasterTypes', keymasterTypes);