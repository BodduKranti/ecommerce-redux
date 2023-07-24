const bcrypt = require('bcrypt')

const authPassword = async (password) => {
    try {
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);
        return hashPassword
    }
    catch (error) {
        console.log(error)
    }
}

const compairPassword = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = { authPassword, compairPassword }