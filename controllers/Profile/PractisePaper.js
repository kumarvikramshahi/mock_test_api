const { ThrowError } = require('../../common/Errors');
const PracticePaper = require('../../schemas/PractisePapers');

exports.fetchPracticePaperById = (req, res, next) => {
    const paperId = req.query.paperId;

    PracticePaper.findOne({ _id: paperId })
        .then(data => {
            if (!data) ThrowError("paper not found!", 404);
            res.status(200).json({ result: userData });
        })
        .catch(err => next(err))
}

exports.postPracticePaper = (req, res, next) => {
    const examType = req.body.exam_type;
    const name = req.body.name;
    const maxMarks = req.body.max_marks;
    const year = req.body.year;
    const isPreviousYear = req.body.is_previous_year;
    const questions = req.body.questions;

    const newPracPaper = PracticePaper({
        exam_type: examType,
        name: name,
        max_marks: maxMarks,
        ...(year && { year: year }),
        is_previous_year: isPreviousYear,
        questions: questions
    })

    newPracPaper.save()
        .then(data => {
            if (!data) ThrowError("Internal server error", 500)
            res.status(201).json({
                message: 'Paper generated',
                data: data
            })
        })
        .catch(err => next(err))
}

exports.addQuestion = (req, res, next) => {
    const paperId = req.body._id;
    const question = req.body.question;

    PracticePaper.updateOne({ _id: paperId }, {
        $push: {
            questions: question
        }
    })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("paper _id not found", 404)
            res.status(200).json({
                message: "Added successfully!"
            })
        })
}

exports.editQuestion = (req, res, next) => {
    const paperId = req.body._id;
    const questionId = req.body.q_id;
    const question = req.body.question;

    PracticePaper.updateOne({ _id: paperId, "questions.q_id": questionId }, {
        $set: {
            "questions.$": question
        }
    })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("paper id not found", 404)
            res.status(200).json({
                message: "Updated successfully!"
            })
        })
        .catch(err => next(err))
}

exports.deleteQuestion = (req, res, next) => {
    const paperId = req.body._id;
    const questionId = req.body.q_id;

    PracticePaper.deleteOne({ _id: paperId, "questions.q_id": questionId })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("paper id not found", 404)
            res.status(200).json({
                message: "Deleted successfully!"
            })
        })
        .catch(err => next(err))
}