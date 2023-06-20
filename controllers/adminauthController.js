const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { adminMail, pwd } = req.body;
    if (!adminMail || !pwd) return res.status(400).json({ 'message': 'email and password are required.' });

    const foundAdmin = await Admin.findOne({ email: adminMail }).exec();
    if (!foundAdmin) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundAdmin.password);
    if (match) {
        
        // create JWTs
        const accessToken = jwt.sign(
            {
                "AdminInfo": {
                    "mail": foundAdmin.mail,
                   
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '100s' }
        );
        const refreshToken = jwt.sign(
            { "adminname": foundAdmin.adminname },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current admin
        foundAdmin.refreshToken = refreshToken;
        const result = await foundAdmin.save();
        console.log(result);
        

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure:true, maxAge: 24 * 60 * 60 * 1000 });//secure:true,

        // Send authorization roles and access token to admin
        res.json({ accessToken ,email:foundAdmin.email ,adminname:foundAdmin.adminname });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };