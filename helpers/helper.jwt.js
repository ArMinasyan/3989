const jwt = require('jsonwebtoken');

const CreateToken = data => jwt.sign(data, process.env.JWT_KEY, {
    algorithm: 'HS384'
});

const VerifyToken = (req, res, next) => {

    const path = req.path;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY, {
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