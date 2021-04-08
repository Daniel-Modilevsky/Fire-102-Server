const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:{ type: String, require: true }, 
    userNumber: { type: String, require: true }, 
    location: { type: String, require: true }, 
    option: { type: String, enumValues: ["Fire Open Space", "Fire In Building" ], require: true }, 
    photo: { type: String, require: true }, 
    date: { type: Date, require: true},

    isDeleted: { type: Boolean, default: false } 
}, {collection: 'reports'});

let Report = module.exports = mongoose.model('Report', reportSchema);



