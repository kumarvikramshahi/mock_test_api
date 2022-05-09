const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionCount = 1;

const PracPapers = new Schema({
    exam_type: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["jee", "upsc", "jee advance", "bpsc"]
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
        unique: true
    },
    max_marks: { type: Number, required: true },
    year: { type: Number, required: false },
    is_previous_year: { type: Boolean, required: true },
    questions: [
        {
            q: { type: String, required: true },
            options: [{ type: String }],
            answer: { type: Number, required: true },
            max_marks: { type: Number, required: true },
            subject: { type: String, required: true, lowercase: true }
        }
    ]
});

module.exports = mongoose.model('Practice_papers', PracPapers)