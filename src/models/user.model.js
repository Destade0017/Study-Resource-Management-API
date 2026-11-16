import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30
  }
},
  {
    timestamps: true
  });

//hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})

//create a fucntion for comaparing password
userSchema.methods.comparePasswords = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

export const User = mongoose.model("User", userSchema);
