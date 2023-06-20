const admin = require('../model/Admin');
const bcrypt = require('bcrypt');

const handleNewAdmin = async (req, res) => {
    const { mail,pwd } = req.body;
    if (!mail||!pwd) return res.status(400).json({ 'message': ' all fields are required.' });

    // check for duplicate adminnames in the db
       const duplicate1 = await admin.findOne({ email: mail }).exec();
    if (duplicate1) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create and store the new admin
        const result = await admin.create({
            
            "email":mail, 
            "password": hashedPwd,
         
        });
        res.json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewAdmin };