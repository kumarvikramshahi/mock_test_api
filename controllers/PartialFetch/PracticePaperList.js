const { ThrowError } = require('../../common/Errors');
const PracticePaper = require('../../schemas/PractisePapers');

exports.fetchPracticePaperByExamType = (req, res, next) => {
    const examType = req.body.exam_type;

    PracticePaper.find({ exam_type: examType })
        .then(data => {
            if (!data.length) ThrowError("Unable to fetch Paper list.", 404);
            var paperList = []
            for (let item of data) {
                paperList.push({
                    _id: item._id,
                    exam_type: item.exam_type,
                    name: item.name,
                    max_marks: item.max_marks,
                    year: item.year,
                    is_previous_year: item.is_previous_year
                })
            }
            res.status(200).json({ data: paperList });
        })
        .catch(err => next(err))
}
