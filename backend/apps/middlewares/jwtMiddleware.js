const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    try {
        // Verify and decode the token (jwt.verify automatically checks exp)
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        
        // Additional manual checks
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        
        // Check if token is expired (redundant but explicit)
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        
        // Check if token was issued in the future (security check)
        if (decoded.iat && decoded.iat > currentTime + 60) { // Allow 60 seconds clock skew
            return res.status(401).json({ message: 'Token issued in the future' });
        }
        
        // Add user info to request object (only what's actually in the token)
        req.user = {
            id: decoded.id,
            iat: decoded.iat,
            exp: decoded.exp
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            return res.status(403).json({ message: 'Token verification failed' });
        }
    }
};

const verifyRole = (requiredRole) => {
    return async (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        // If role is not present in token, fetch from DB or another source if needed
        const user = await User.findById(req.user.id);

        if (user && user.role) {
            req.user.role = user.role;
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        next();
    };
};

module.exports = { verifyToken, verifyRole };