const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => { 
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]; 
        console.log(token)
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
        console.log(decodedToken)
        const userId = decodedToken.userId; 
        console.log(userId)
        req.decodedToken = decodedToken
        if (req.body.userId && req.body.userId !== userId) { 
            throw 'User ID non valable'; 
        } else {
            next();
        }
        
    } catch(error) {
        res.status(401).json({ error });
    }
   

};