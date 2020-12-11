const bcrypt = require('bcryptjs');
const { pseudoRandomBytes, createHmac } = require('crypto');


const hashPassword = async (password) => {
    let salt = pseudoRandomBytes(12).toString('hex');
    let hash = createHmac('SHA256', salt).update(password).digest('hex');
    return hash + '.' + salt;
}

const comparePassword = (newPassword, password) => {
    const splited = password.split('.');

    let hash = createHmac('SHA256', splited[1]).update(newPassword).digest('hex');
    return splited[0] == hash;
}

module.exports = {
    hashPassword,
    comparePassword
}

