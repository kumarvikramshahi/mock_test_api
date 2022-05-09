// const JWT = require('jsonwebtoken');

const { ThrowError } = require('../../common/Errors')
const User = require('../../schemas/Profile/User')

exports.getUserList = (req, res, next) => {

    const pincode = req.query.pincode;

    User.find() // { address: { pincode: pincode } }
        .then(data => {
            if (!data.length) ThrowError("Unable to fetch User list.", 404);
            const userList = []
            for (let item of data) {
                userList.push({
                    _id: item._id,
                    first_Name: item.first_Name,
                    last_Name: item.last_Name,
                    mobileNo: item.mobileNo,
                    profile_Pic: item.profile_Pic
                })
            }
            res.status(200).json({ data: userList });
        })
        .catch(err => next(err))
}