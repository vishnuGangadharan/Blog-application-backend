import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


const secretKey = process.env.JWT_SECRET_KEY
console.log('secretKey',secretKey);
  

export const userAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 console.log('looooooo');
 

    if (!token) {
        return res.status(400).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        req.userId = decoded.userId;  
        return next();
    } catch (error) {
        console.log('Verification Error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token has expired.' });
        } else {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    }
}
