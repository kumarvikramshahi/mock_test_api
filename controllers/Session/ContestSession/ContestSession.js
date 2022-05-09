// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../../common/Errors')
const ContestSession = require('../../../schemas/ContestSession')
const User = require('../../../schemas/Profile/User')

exports.postContestSession = (req, resp, next) => {

    const name = req.body.name;
    const organizer = req.body.organizer;
    const participants = req.body.participants;
    const sessionType = req.body.sess_type;
    const startDate = req.body.start_date;
    const endDate = req.body.end_data;

    const newContestSession = ContestSession({
        name: name,
        organizer: organizer,
        ...(participants && { participants: participants }),
        sess_type: sessionType,
        start_date: startDate,
        end_data: endDate,
        status: paymentMode !== 'cod' && !paymentId ? "pending" : 'scheduled',
    })

    newContestSession.save()
        .then(async (data) => {
            if (!data) ThrowError("Internal server error", 500)
            let UserCount = 0;

            for (let item of participants) {
                const result = await User.updateOne({ _id: item }, { $push: { contest_sessions: data._id } })
                if (!(result.matchedCount)) ThrowError(`Invalid s_Id[${UserCount}]`, 400);
                if (!(result.modifiedCount)) ThrowError("Internal Server Error", 500);
                UserCount++;
            }

            resp.status(201).json({
                message: "session generated and its ID added to " + UserCount + " User's profile.",
                data: data
            })
        })
        .catch(err => next(err))
}

exports.patchTeachSession = (req, res, next) => {
    const name = req.body.name;
    const organizer = req.body.organizer;
    const participants = req.body.participants;
    const sessionType = req.body.sess_type;
    const startDate = req.body.start_date;
    const endDate = req.body.end_data;
    const status = req.body.status;

    TeachSession.updateOne({ _id: sesId }, {
        $set: {
            ...((isGrpStudy == true || isGrpStudy == false) && { is_grp_study: isGrpStudy }),
            ...(sessionType && { sess_type: sessionType }),
            ...(startDate && { start_date: startDate }),
            ...(endDate && { end_data: endDate }),
            ...(subjectTeach && { sub_teach: subjectTeach }),
            ...(isTeacherVisit != null && isTeacherVisit != undefined && { is_teacher_visit: isTeacherVisit }),
            ...(status && { status: status })
        }
    })
        .then(result => {
            if (!(result.matchedCount)) ThrowError("ses_id not found", 404)
            res.status(200).json({
                message: "Updated successfully!"
            })
        })
        .catch(err => next(err))
}

exports.fetchTeachSession = (req, res, next) => {
    const sesId = req.query.ses_id;

    TeachSession.findOne({ _id: sesId })
        .then(data => data)
        .catch(err => next(err))
}

// delete for cancelled sessions and also delete it from User's & teacher's teach sessions.

// exports.deleteTeachSession = (req, res, next) => {
//     const sesId = req.query.ses_id;

//     TeachSession.findOneAndDelete({ _id: sesId })
//         .then(result => {

//             // const updateResult = await Teacher.updateOne({ _id: result.tid},)

//             if (!result) ThrowError("Server Error", 500);
//             res.status(200).json({
//                 message: "sesion deleted successfully!"
//             })
//         })
//         .catch(err => next(err))
// }
