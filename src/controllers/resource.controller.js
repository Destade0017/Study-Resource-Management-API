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

//get one resource
const getOneResource = async (req, res) => {
  try {
    //get the id
    const { id } = req.params;

    //find resource
    const resource = await Resource.findOne(id)

    if(!resource){
      return res.status(404).json({
        success: false,
        message: "Resource not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Resource fetched",
      data: resource
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}


const getAllResource = async (req, res) => {
  try {
    const resources = await Resource.find()

    return res.status(200).json({
      success: true,
      message: "All resources fetched",
      data: resources
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

//delete resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource does not exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Resource successfully deleted!",
      data: resource
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

export { createResource, getAllResource, deleteResource, getOneResource };
