// controllers/predictController.js

const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const { TreePhoto } = require('./../models/three_photo');
const path = require('path');


let model;
class CustomL2Regularizer extends tf.regularizers.l2 {
    static className = 'L2';

    constructor(config) {
        super({ l2: config.l2 || 0.01 });
    }
}

// Register the custom L2 regularizer
tf.serialization.registerClass(CustomL2Regularizer);

// Load model when server starts
async function loadModel() {
    const modelPath = path.resolve(__dirname, './../ml_model/model.json');
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Model loaded successfully.");
}
loadModel();

async function predictTreePresence(imagePath) {
    const imageBuffer = await sharp(imagePath)
        .resize({ width: 256, height: 256 })
        .toBuffer();

    const tensor = tf.node.decodeImage(imageBuffer)
        .expandDims(0)
        .div(tf.scalar(255.0));

    const prediction = model.predict(tensor);
    const [treeProb] = prediction.dataSync();

    return treeProb > 0.5; // Return true if tree is detected
}

async function handleTreePhotoPrediction(req, res) {
    try {
        const imagePath = req.file.path;
        const hasTree = await predictTreePresence(imagePath);

        res.json({ message: "Tree photo processed successfully", hasTree });
    } catch (error) {
        console.error("Prediction error:", error);
        res.status(500).json({ error: "Error processing tree photo" });
    }
}

module.exports = {
    handleTreePhotoPrediction
};
