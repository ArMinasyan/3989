const jwt = require('jsonwebtoken');



const CreateToken = data => jwt.sign(data, process.env.JWT_KEY, {
    algorithm: 'HS384'
});

const VerifyToken = (req, res, next) => {

    const path = req.path;
    if (req.authorization && req.authorization['token']) {
        jwt.verify(req.cookies.token, process.env.JWT_KEY, {
            algorithms: ['HS384']
        },
            function (err, dec) {
                if (err || dec === undefined) res.status(401).send('Unauthorized');
                else {
                    req.session.user = dec;
                    next();
                }
            })
    } else res.status(401).send('Unauthorized');
}

module.exports = {
    CreateToken,
    VerifyToken
}