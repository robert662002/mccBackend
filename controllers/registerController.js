const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { mail,username, pwd,semester,branch } = req.body;
    if (!mail||!username||!pwd||!semester||!branch) return res.status(400).json({ 'message': ' all fields are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    const duplicate1 = await User.findOne({ email: mail }).exec();
    if (duplicate||duplicate1) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create and store the new user
        const result = await User.create({
            
            "email":mail,
            "username": username,
            "password": hashedPwd,
            "semester":semester,
            "branch":branch,
        });
        res.json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };