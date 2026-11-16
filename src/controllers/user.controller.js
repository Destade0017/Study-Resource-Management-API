import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  //get parameter
  const { email, username, password, age } = req.body;

  //basic validation
  if( !email || ! username || !password || age === undefined ){
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


export default createUser;
