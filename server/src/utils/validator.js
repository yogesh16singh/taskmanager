const bcrypt= require("bcrypt")

exports.isValidEmail = function(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}
exports.checkValidString = function (value) {
    if (typeof value === 'undefined' || value === null || typeof value === 'number') return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

exports.securepw = async (pw) => {
    let saltrounds = 10
    const hashpass = await bcrypt.hash(pw, saltrounds)
    return hashpass
}

exports.comparePw = async (pw, hash) => {
    const compare = await bcrypt.compare(pw, hash)
    return compare
}

