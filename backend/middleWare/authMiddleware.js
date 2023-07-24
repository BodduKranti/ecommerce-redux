const JWT = require('jsonwebtoken');
const { signUsr } = require('../schemaModel/Schema');

const requireSignin = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_TOCKEN)
        req.useRdeatil = decode;
        next()
    } catch (error) {
        console.log(error)
    }

}

const isAdmin = async (req, res, next) => {
    try {
        const user = await signUsr.findById(req.useRdeatil._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
}

module.exports = { requireSignin, isAdmin };