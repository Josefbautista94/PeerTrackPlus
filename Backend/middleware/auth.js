import jwt from 'jsonwebtoken'; 
import User from '../models/userSchema.js'
// start auth after done with everything else

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; //receives autho header from requests
        const token = authHeader && authHeader.split(' ')[1] // BEARERE [' '] TOKEN

        if(!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        //token validation
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user
        const user = await User.findById(decoded.id).select('-password');
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({message: 'Invalid or expired token'})
    }
    
};

export const adminOnly = (req, res, next) => {
    if(req.user?.role !== "admin") {
        return res.status(403).json({message: "Admin Only"})
    }
    next();
};