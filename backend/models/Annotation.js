const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  predictionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction', required: true },
  annotations: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Annotation', annotationSchema);