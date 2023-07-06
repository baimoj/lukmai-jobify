import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  //const header = req.headers;

  console.log("cookies", req.cookies);

  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  //console.log(authHeader);
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new UnAuthenticatedError("Authentivateion Invalid");
  // }
  // const token = authHeader.split(" ")[1];
  //
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "64783fd9b21a758356620518";
    req.user = { userId: payload.userId, testUser, company: "Grouplease" };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentivateion Invalid");
  }
};

export default auth;
