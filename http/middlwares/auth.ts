import jwt from "jsonwebtoken";
const verifyToken = (req: any, res: any, next: any) => {
  // const token = req.headers.authorization.split(' ')[1];
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded: any = jwt.verify(token, "alihaseeb");
    req.user = decoded.id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
