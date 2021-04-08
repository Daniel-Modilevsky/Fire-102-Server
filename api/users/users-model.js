const mongoose = require('mongoose');
const logger = require('../../lib/logs');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    trainsHistory: { type: [mongoose.Schema.Types.ObjectId], ref: 'Train' },
    image: {type: String },
    isAdmin: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
},{ collection: 'users'});


userSchema.pre('save', next => {
    logger.info('Saving');
    return next();
});


let User = module.exports = mongoose.model('User', userSchema);


