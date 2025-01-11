import jwt from 'jsonwebtoken';

// const ensureAuthenticated = (req, res, next) => {
//     const token = req.header('Authorization'); // Get the token from headers
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
//         req.user = decoded; // Attach the decoded payload to req.user
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid or expired token.' });
//     }
// };

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user to request
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };

export default ensureAuthenticated;
