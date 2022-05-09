const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfile = new Schema({
    first_Name: {
        type: String,
        required: true,
        maxlength: 15,
        minlength: 2,
        trim: true
    },
    last_Name: { type: String, required: true, maxlength: 15, minlength: 2, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    mobileNo: { type: Number, required: true, unique: true, },
    password: { type: String, required: true },
    profile_Pic: { type: String },
    educational_details: {
        education_level: { type: String },
        degree: { type: String },
    },
    contest_sessions: [{
        type: String,
        trim: true,
        minlength: [24, "Invalid user ID"],
        maxlength: [24, "Invalid user ID"]
    }],
    joining_date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('User', userProfile);