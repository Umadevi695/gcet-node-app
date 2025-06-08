import jwt from "jsonwebtoken";
const SECRET_KEY = "helloworld";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      // req.userId = user.id;
      // req.role = user.role;
      req.email = user.email;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized Access" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
