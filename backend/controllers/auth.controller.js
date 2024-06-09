import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "passwords don't match",
      });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyprofilePic =
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&uid=R67632557&ga=GA1.1.1297771311.1715095396&semt=ais_user";
    const girlProfilePic =
      "https://img.freepik.com/free-photo/cute-girl-with-blond-hair-blue-eyes-3d-rendering_1142-51238.jpg?t=st=1717670912~exp=1717674512~hmac=157954977e1c0eeb1739f48ede9b15edb61ac40f70d8a99a18d8da76e15dc93d&w=740";

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyprofilePic : girlProfilePic,
    });

    if (newUser) {
      //generate jwt token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "invalid user data",
      });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Username or password is incorrect",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
