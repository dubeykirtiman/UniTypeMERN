import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or headers
    const token = req.cookies?.jwt || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Token verified for user: ${decoded._id}`);

    // Find user by ID in the database
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user object to the request
    req.user = user;

    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    res.status(401).json({ message: 'Unauthorized access', error: error.message });
  }
};

export default authMiddleware;
