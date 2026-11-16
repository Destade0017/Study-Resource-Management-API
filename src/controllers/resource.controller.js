import mongoose from "mongoose";
import { Resource } from "../models/resources.model.js";

//create a Resource
const createResource = async (req, res) => {
  try {
    //get the parameters sent
    const { title, url, description, category, type, completed } = req.body;

    if (!title || !url || !description || !category || !type || completed === undefined) {
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

    //check if the id is a valid one

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Resource ID"
      })
    }

    //find resource of that particular id
    const resource = await Resource.findById(id)

    if (!resource) {
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

//update resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;

    //check if the id is a valid one

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Resource ID"
      })
    }

    //get the updated values
    const { title, url, description, category, type, completed } = req.body;

    const updates = {};
      if (title !== undefined) updates.title = title;
      if (url !== undefined) updates.url = url;
      if (description !== undefined) updates.description = description;
      if (category !== undefined) updates.category = category;
      if (type !== undefined) updates.type = type;
      if (completed !== undefined) updates.completed = completed;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update"
      });
    }

    //find and update
    const resource = await Resource.findByIdAndUpdate(id, updates,
      {
        new: true,
        runValidators: true
      }
    )

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Resource updated successfully",
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

    const { category, completed } = req.query;

    //create a filter object
    const filter = {}

    if (category) {
      const safeCategory = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.category = { $regex: new RegExp(`^${safeCategory}$`, "i") };
    }

    if(completed !== undefined){
      filter.completed = completed === "true"
    }

    const resources = await Resource.find(filter)

    return res.status(200).json({
      success: true,
      message: "All resources fetched",
      data: resources
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

//delete resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    //check if the id is a valid one

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Resource ID"
      })
    }

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
      data: {
        id: resource._id,
        title: resource.title,
        deletedAt: Date.now()
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

export { createResource, updateResource, getAllResource, deleteResource, getOneResource };
