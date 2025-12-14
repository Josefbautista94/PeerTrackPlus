import jwt from 'jsonwebtokenb';

// start auth after done with everything else

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const token = authHeader.split(" ")[1]
    }
};

export const adminOnly = (req, res, next) => {
    if(req.user?.role !== "admin") {
        return res.status(403).json({message: "Admin Only"})
    }
    next();
}