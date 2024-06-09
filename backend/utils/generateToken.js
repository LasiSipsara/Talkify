import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000, //milliseconds
    httpOnly: true, //prevent xss attacks(cross site attacks)
    sameSite: "strict", //csrf attacks(cross-site request forgery attacks)
    secure: process.env.NODE_ENV !== "development",
  });
};
export default generateTokenAndSetCookie;
