import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  //get parameter
  const { email, username, password, age, name } = req.body;

  //basic validation
  if( !email || !username || !name || !password || age === undefined ){
    return res.status(400).json({
      success: false,
      message: "Incomplete Credentials"
    })
  }

  //check if email exists before
  const existing = await User.findOne({ email: email.toLowerCase() });

  if(existing){
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
}

const loginUser = async (req, res) => {
  //get parameters
  const { email, password } = req.body;

  //basic validation
  if ( !email || !password ){
    return res.status(400).json({
      success: false,
      message: "Incomplete Credentials"
    })
  }

  //check if user does not exist
  const user = await User.findOne({ email: email.toLowerCase() });

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User does not exist"
    })
  }
}

export default createUser;
