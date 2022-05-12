const { ThrowError } = require('../../common/Errors');
const PracticePaper = require('../../schemas/PractisePapers');

exports.fetchPracticePaper = (req, res, next) => {
    const paperId = req.query.paper_id;
    const examType = req.query.exam_type;

    if (paperId) {
        PracticePaper.findOne({ _id: paperId })
            .then(data => {
                if (!data) ThrowError("paper not found!", 404);
                res.status(200).json({ result: data });
            })
            .catch(err => next(err))
    }
    if (examType) {
        PracticePaper.find({ exam_type: examType, is_Public: true })
            .then(data => {
                if (!data.length) ThrowError(`Unable to fetch ${examType} Paper list, Try again!`, 404);
                var paperList = []
                for (let item of data) {
                    paperList.push({
                        _id: item._id,
                        exam_type: item.exam_type,
                        name: item.name,
                        max_marks: item.max_marks,
                        year: item.year,
                        is_previous_year: item.is_previous_year,
                        is_Public: item.is_Public,
                    })
                }
                res.status(200).json({ data: paperList });
            })
            .catch(err => next(err))
    }
    if (!paperId && !examType) {
        res.status(400).json({ message: "Invalid request" });
    }
}

exports.postPracticePaper = (req, res, next) => {
    const examType = req.body.exam_type;
    const name = req.body.name;
    const maxMarks = req.body.max_marks;
    const year = req.body.year;
    const isPreviousYear = req.body.is_previous_year;
    const questions = req.body.questions;

    PracticePaper.findOne({ name: name })
        .then(result => {
            if (result) ThrowError("Paper with this name already exist, maybe this paper already exist, just cross check once", 400);
            const newPracPaper = new PracticePaper({
                exam_type: examType,
                name: name,
                max_marks: maxMarks,
                ...(year && { year: year }),
                is_previous_year: isPreviousYear,
                is_Public: false,
                questions: questions
            })
            return newPracPaper.save()
        })
        .then(data => {
            if (!data) ThrowError("Internal server error", 500)
            res.status(201).json({
                message: 'Paper generated',
                data: data
            })
        })
        .catch(err => next(err))
}

exports.editPracticePaper = (req, res, next) => {
    const queryPaperId = req.query.paper_id;
    const isPublic = req.query.is_Public;

    const paperId = req.body.paper_id;
    const examType = req.body.exam_type;
    const name = req.body.name;
    const maxMarks = req.body.max_marks;
    const year = req.body.year;
    const isPreviousYear = req.body.is_previous_year;

    PracticePaper.updateOne(paperId ? { _id: paperId } : { _id: queryPaperId }, {
        $set: {
            ...(examType && { exam_type: examType }),
            ...(name && { name: name }),
            ...(maxMarks && { max_marks: maxMarks }),
            ...(year && { year: year }),
            ...(isPreviousYear && { is_previous_year: isPreviousYear }),
            ...((isPublic !== undefined && isPublic !== null) && { is_Public: isPublic })
        }
    })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("paper id not found", 404)
            if (isPublic !== undefined && isPublic !== null) {
                const status = isPublic ? 'PUBLIC' : 'PRIVATE';
                res.status(200).json({ message: `Paper made ${status} successfully!` })
            } else {
                res.status(200).json({
                    message: "Updated successfully!"
                })
            }
        })
        .catch(err => next(err))

}

exports.addQuestion = (req, res, next) => {
    const paperId = req.body._id;
    const question = req.body.question;
    const isPublic = req.body.is_Public;

    PracticePaper.updateOne({ _id: paperId }, {
        $push: { questions: question },
        $set: { ...((isPublic === true || isPublic === false) && { is_Public: isPublic }) }
    })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("paper _id not found", 404)
            console.log(result)
            res.status(200).json({
                message: "Added successfully!"
            })
        })
}

exports.editQuestion = (req, res, next) => {
    const paperId = req.body._id;
    const questionId = req.body.q_id;
    const question = req.body.question;

    PracticePaper.updateOne({ _id: paperId, "questions._id": questionId }, {
        $set: { "questions.$": question }
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