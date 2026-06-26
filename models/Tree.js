const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    treename: {
        type: String,
        required: [true, 'Tree Name is required'] 
    },
    description: {
        type: String,
        required: [true, 'Description is required'] 
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150' 
    }
}, { versionKey: false });


module.exports = mongoose.model('Tree', treeSchema, 'TreeCollection');