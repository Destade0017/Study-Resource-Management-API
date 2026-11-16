import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLenght: 50
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLenght: 350
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true
  }
},
{
  timestamps: true
})

export const Resource = mongoose.model("Resource", resourceSchema)
