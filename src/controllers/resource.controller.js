import { Resource } from "../models/resources.model.js";

//create a Resource
const createResource = async (req, res) => {
  try {
    //get the parameters sent
    const { title, url, description, category, type, completed } = req.body;

    if (!title, !url, !description, !category, !type, !completed) {
      return res.status(400).json({
        success: false,
        message: "Incomplete Credentials"
      })
    }
    //create new resource
    const resource = await Resource.create({
      title,
      url,
      description,
      category,
      type,
      completed
    })

    return res.status(201).json({
      success: true,
      message: "Resource Created successfully",
      data: resource
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}


export default createResource;
