const { authPassword, compairPassword } = require("../helper/authPassword");
const { signUsr } = require("../schemaModel/Schema");
const JWT = require('jsonwebtoken');


// POST method for signup user
const singUpcontroller = async (req, res) => {

    try {
        const { firstName,
            lastName,
            email,
            phone,
            address,
            userImg,
            userPwd } = req.body


        // if same email id use then this method will work
        const existingUser = await signUsr.findOne({ email: email })

        if (existingUser) {
            return res.status(400).send({
                Message: "This Email is Already exist please try with another email id"
            })
        }

        const hasPwd = await authPassword(userPwd);

        const userData = await new signUsr({
            firstName,
            lastName,
            email,
            phone,
            address,
            userImg,
            userPwd: hasPwd
        }).save();

        res.status(201).send({
            Message: "Registration Successfully",
            alert: true,
            user: userData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message: "Something went wrong..."
        })
    }


    // const { firstName,
    //     lastName,
    //     email,
    //     phone,
    //     address,
    //     userImg,
    //     userPwd } = req.body
    // const hasPwd = await authPassword(userPwd);

    // signUsr.findOne({ email: email })

    //     .then((user) => {
    //         if (user) {
    //             return res.status(400).json({
    //                 Message: "This Email Address is Already Exists Please try with another email id"
    //             })
    //         }
    //         else {
    //             const signupData = new signUsr({
    //                 firstName,
    //                 lastName,
    //                 email,
    //                 phone,
    //                 address,
    //                 userImg,
    //                 userPwd: hasPwd
    //             });
    //             const user = signupData.save();
    //             console.log(user)
    //             return res.status(200).json({
    //                 Message: "Registration is successfully",
    //                 alert: true,
    //                 user
    //             })
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         return res.status(500).json({
    //             Message: "Something went wrong..."
    //         })
    //     })
}

const loginUser = async (req, res) => {
    const { email, userPwd } = req.body
    try {
        const exisTingEmail = await signUsr.findOne({ email });
        const match = await compairPassword(userPwd, exisTingEmail.userPwd)

        if (!match) {
            return res.status(500).send({
                Message: "Invalid Password Please enter correct password",
                alert: true
            })
        }

        if (exisTingEmail) {
            const useRdeatil = {
                _id: exisTingEmail._id,
                firstName: exisTingEmail.firstName,
                lastName: exisTingEmail.lastName,
                email: exisTingEmail.email,
                phone: exisTingEmail.phone,
                address: exisTingEmail.address,
                userImg: exisTingEmail.userImg,
                userPwd: exisTingEmail.userPwd
            }
            const token = await JWT.sign({ _id: exisTingEmail._id }, process.env.JWT_TOCKEN, { expiresIn: "7d" })
            return res.status(200).send({
                Message: "Login Successfully",
                alert: true,
                useRdeatil,
                token
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            Message: "This Email is not register",
            alert: false
        })
    }
}

// test controller 
const textController = (req, res) => {
    res.send("Protected Route")
}

module.exports = { singUpcontroller, loginUser, textController };

