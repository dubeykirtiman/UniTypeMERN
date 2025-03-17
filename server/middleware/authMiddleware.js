import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);  // JWT verification using the secret key from environment variables
    console.log(`Token verified for user: ${verifyUser._id}`);

    // Find user by ID in the database
    const user = await Register.findOne({ _id: verifyUser._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user and token to the request object
    req.token = token;
    req.user = user;

    next(); // Call the next middleware or route handler

  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    res.status(401).json({ message: 'Unauthorized access', error: error.message });
  }
};

export default auth;
