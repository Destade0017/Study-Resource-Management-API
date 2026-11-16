import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 50
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxlength: 350
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
