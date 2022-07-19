const mongoose = require('mongoose');
const { Schema } = mongoose;

const PracPapers = new Schema({
    exam_type: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["jee", "upsc", "jee advance", "bpsc", 'ssc']
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
        unique: true
    },
    max_marks: { type: Number, required: true },
    is_previous_year: { type: Boolean, required: true },
    year: { type: Number, required: false },
    instructions: { type: String, required: true },
    subjects: [{ type: String }],
    time_Limit: {
        hours: { type: Number, required: true },
        minutes: { type: Number, required: true }
    },
    questions: [
        {
            q: { type: String, required: true },
            options: [{ type: String }],
            answer: { type: Number, required: true },
            max_marks: { type: Number, required: true },
            subject: { type: String, required: true, lowercase: true },
            type: {
                type: String, required: true, lowercase: true,
                enum: ["single_correct", "multi_correct", "single_digit_integer", "numerical_value"]
            }
        }
    ],
    is_Public: { type: Boolean, required: true },
});

module.exports = mongoose.model('Practice_papers', PracPapers)