const jwt = require('jsonwebtoken');

const genAuthToken = (user) =>{
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign({
        _id: user._id, name: user.name, email: user.email
    }, "secret-key", {expiresIn: "1h"}
    );
    return token;
};

module.exports = genAuthToken;