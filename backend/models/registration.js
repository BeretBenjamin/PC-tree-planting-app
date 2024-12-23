// Import mongoose
const mongoose = require('mongoose');

// Define the registration schema
const registrationSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'canceled'],
    default: 'pending',
    required: true
  },
  registered_at: {
    type: Date,
    default: Date.now
  },
  points_awarded: {
    type: Number,
    default: 0,
    min: 0
  }
});

// Create indexes for efficient querying on event_id and user_id
registrationSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

// Compile the model
const Registration = mongoose.model('Registration', registrationSchema);

// CRUD Operations

// Create a new registration
async function createRegistration(data) {
  try {
    const registration = new Registration(data);
    await registration.save();
    console.log("Registration created successfully");
    return registration;
  } catch (error) {
    console.error("Error creating registration:", error);
    throw error;
  }
}

// Read (Get) a registration by ID
async function getRegistrationById(registrationId) {
  try {
    const registration = await Registration.findById(registrationId)
      .populate('event_id user_id');
    if (!registration) {
      throw new Error("Registration not found");
    }
    return registration;
  } catch (error) {
    console.error("Error fetching registration:", error);
    throw error;
  }
}

// Update a registration by ID
async function updateRegistrationById(registrationId, updateData) {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedRegistration) {
      throw new Error("Registration not found");
    }
    console.log("Registration updated successfully");
    return updatedRegistration;
  } catch (error) {
    console.error("Error updating registration:", error);
    throw error;
  }
}

// Delete a registration by ID
async function deleteRegistrationById(registrationId) {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(registrationId);
    if (!deletedRegistration) {
      throw new Error("Registration not found");
    }
    console.log("Registration deleted successfully");
    return deletedRegistration;
  } catch (error) {
    console.error("Error deleting registration:", error);
    throw error;
  }
}

// Export the model and CRUD functions
module.exports = {
  Registration,
  createRegistration,
  getRegistrationById,
  updateRegistrationById,
  deleteRegistrationById
};
