import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let user;
  let latestAccessToken;
  // let authHeader = req.headers.authorization || req.headers.Authorization;
  //  if (authHeader && authHeader.startsWith("Bearer")) {
  if (req.cookies.FStoken) {
    token = req.cookies.FStoken;
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or Token is missing");
    }
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err.name == "TokenExpiredError") {
        const refereshToken = req.cookies.FSrefreshToken;
        if (!refereshToken) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        Jwt.verify(
          refereshToken,
          process.env.ACCESS_TOKEN_SECERT,
          (err, decoded) => {
            console.log(decoded);
            latestAccessToken = Jwt.sign(
              {
                user: decoded.user,
              },
              process.env.ACCESS_TOKEN_SECERT,
              { expiresIn: "1d" }
            );
            user = decoded.user;
            if (err) {
              res.status(401);
              throw new Error("User is not authorized");
            }
          }
        );
      } else if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      //console.log(decoded);
      req.user = decoded?.user || user;
      res.cookie("FStoken", latestAccessToken);
      next();
    });
  }
});

export { validateToken };
