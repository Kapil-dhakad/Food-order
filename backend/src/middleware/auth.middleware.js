const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
console.log(req.cookies.token)

    const token = req.cookies.token 
    if(!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

   try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id || decoded._id;
       next();
   } catch (error) {
       return res.status(403).json({ success: false, message: 'Invalid token' });
   }
};

module.exports = authMiddleware;
