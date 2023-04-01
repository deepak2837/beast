import jwt from "jsonwebtoken";
import { secret } from "../configs/auth.config.js";
export const jwtverify = (req, res, next) => {
  console.log("hitting jwtverify")
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      
      console.log(decoded.userId)
      req.body.userId = decoded.userId;
      
      next();
    })

}