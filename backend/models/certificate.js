// Import mongoose
const mongoose = require('mongoose');

// Define the certificate schema
const certificateSchema = new mongoose.Schema({
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
  certificate_url: {
    type: String,
    required: true
  },
  issued_at: {
    type: Date,
    default: Date.now
  }
});

// Create a unique index for efficient querying on user_id and event_id
certificateSchema.index({ user_id: 1, event_id: 1 }, { unique: true });

// Compile the model
const Certificate = mongoose.model('Certificate', certificateSchema);

// CRUD Operations

// Create a new certificate
async function createCertificate(data) {
  try {
    const certificate = new Certificate(data);
    await certificate.save();
    console.log("Certificate created successfully");
    return certificate;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
}

// Read (Get) a certificate by ID
async function getCertificateById(certificateId) {
  try {
    const certificate = await Certificate.findById(certificateId)
      .populate('user_id event_id'); // Optional: populate references
    if (!certificate) {
      throw new Error("Certificate not found");
    }
    return certificate;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
}

// Update a certificate by ID
async function updateCertificateById(certificateId, updateData) {
  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      certificateId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedCertificate) {
      throw new Error("Certificate not found");
    }
    console.log("Certificate updated successfully");
    return updatedCertificate;
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error;
  }
}

// Delete a certificate by ID
async function deleteCertificateById(certificateId) {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(certificateId);
    if (!deletedCertificate) {
      throw new Error("Certificate not found");
    }
    console.log("Certificate deleted successfully");
    return deletedCertificate;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error;
  }
}

// Export the model and CRUD functions
module.exports = {
  Certificate,
  createCertificate,
  getCertificateById,
  updateCertificateById,
  deleteCertificateById
};
