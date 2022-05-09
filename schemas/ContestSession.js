const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContestSession = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
    },
    organizer: {
        type: String,
        required: true,
        trim: true,
        minlength: [24, "Invalid user ID"],
        maxlength: [24, "Invalid user ID"]
    },
    participants: [{ type: String, trim: true, minlength: 24, maxlength: 24, required: false }],
    sess_type: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    start_date: { type: Date, required: true, },
    end_data: { type: Date, required: true, },
    status: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["scheduled", "pending", "completed", "cancelled"]
    },
});

module.exports = mongoose.model('Contest_Session', ContestSession);