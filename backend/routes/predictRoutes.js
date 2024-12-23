// routes/predictRoutes.js

const express = require('express');
const { handleTreePhotoPrediction } = require('../controllers/predictController');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: 'public/uploads/' }); // Set a temporary storage location for uploaded images
router.post('/predict-tree', upload.single('image'), handleTreePhotoPrediction);

module.exports = router;
