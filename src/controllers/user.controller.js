import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    //get parameter
    const { email, username, password, age, name } = req.body;

    //basic validation
    if (!email || !username || !name || !password || age === undefined) {
      return res.status(400).json({
        success: false,
        message: "Incomplete Credentials"
      })
    }

    //check if email exists before
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(401).json({
        success: false,
        message: "User exist already!"
      })
    }

    const user = await User.create({
      email: email.toLowerCase(),
      username,
      password,
      age
    })

    return res.status(201).json({
      success: true,
      message: "User successfully created",
      data: {
        email: user.email,
        username: user.username,
        age: user.age
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const loginUser = async (req, res) => {
  try {
    //get paraneters
    const { email, password } = req.body;

    //basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Incomplete Credentials"
      })
    }

    //check if user does not exist
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }

    //check if password is correct
    const correctPassword = await user.comparePasswords(password);

    if (!correctPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    //get id
    const { id } = req.params;

    const users = await User.find();

    return res.status(200).json({
      success: true,
      message: "All users fetched",
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

export  { createUser, loginUser };
