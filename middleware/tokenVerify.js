const jwt = require('jsonwebtoken');
const verifyAdminToken = (req, res, next) => {
    const secret = process.env.adminsecretkey;
    const token = req.headers["admin"]
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.send({ "status": "400", "message": "JWT token got expired please login again" })
                console.log('JWT verification failed:', err.message);
            } else {
                console.log('JWT verification successful:', decoded);
                next()
            }
        });
    }
    else {
        res.send({ "status": "400", "message": "please enter token to access this appilication" })
    }
}

const verifyUserToken = (req, res, next) => {
    const secret = process.env.userSecretkey;
    const token = req.headers["user"]
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.send({ "status": "400", "message": "JWT token got expired please login again" })
                console.log('JWT verification failed:', err.message);
            } else {
                console.log('JWT verification successful:', decoded);
                req.body.id = decoded.id;
                next()
            }
        });
    }
    else {
        res.send({ "status": "400", "message": "please enter token to access this appilication" })
    }
}


module.exports = { verifyAdminToken,verifyUserToken }