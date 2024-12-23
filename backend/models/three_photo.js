// Import mongoose
const mongoose = require('mongoose');

// Define the tree photo schema
const treePhotoSchema = new mongoose.Schema({
  registration_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  photo_url: {
    type: String,
    required: true
  },
  is_valid: {
    type: Boolean,
    default: false
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

// Compile the model
const TreePhoto = mongoose.model('TreePhoto', treePhotoSchema);

// CRUD Operations

// Create a new tree photo
async function createTreePhoto(data) {
  try {
    const treePhoto = new TreePhoto(data);
    await treePhoto.save();
    console.log("Tree photo created successfully");
    return treePhoto;
  } catch (error) {
    console.error("Error creating tree photo:", error);
    throw error;
  }
}

// Read (Get) a tree photo by ID
async function getTreePhotoById(photoId) {
  try {
    const treePhoto = await TreePhoto.findById(photoId)
      .populate('registration_id user_id event_id'); // Populate references if needed
    if (!treePhoto) {
      throw new Error("Tree photo not found");
    }
    return treePhoto;
  } catch (error) {
    console.error("Error fetching tree photo:", error);
    throw error;
  }
}

// Update a tree photo by ID
async function updateTreePhotoById(photoId, updateData) {
  try {
    const updatedTreePhoto = await TreePhoto.findByIdAndUpdate(
      photoId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedTreePhoto) {
      throw new Error("Tree photo not found");
    }
    console.log("Tree photo updated successfully");
    return updatedTreePhoto;
  } catch (error) {
    console.error("Error updating tree photo:", error);
    throw error;
  }
}

// Delete a tree photo by ID
async function deleteTreePhotoById(photoId) {
  try {
    const deletedTreePhoto = await TreePhoto.findByIdAndDelete(photoId);
    if (!deletedTreePhoto) {
      throw new Error("Tree photo not found");
    }
    console.log("Tree photo deleted successfully");
    return deletedTreePhoto;
  } catch (error) {
    console.error("Error deleting tree photo:", error);
    throw error;
  }
}

// Export the model and CRUD functions
module.exports = {
  TreePhoto,
  createTreePhoto,
  getTreePhotoById,
  updateTreePhotoById,
  deleteTreePhotoById
};
