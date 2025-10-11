const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const User = require('./models/User');
const Prediction = require('./models/Prediction');
const Annotation = require('./models/Annotation');

// Mock Python service (replace with actual TensorFlow integration)
const { classifyWithPython, generateGradCAM } = require('./utils/python_service');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Environment variable validation
const requiredEnvVars = {
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`Error: ${key} is not set in .env file`);
    process.exit(1);
  }
}

const LOG_FILE_PATH = 'C:/logs/api-logs.log';

// Ensure logs directory exists
const ensureLogDir = async () => {
  const dir = path.dirname(LOG_FILE_PATH);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Log API call function
const logApiCall = async (method, endpoint, statusCode, payload = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method,
    endpoint,
    status: statusCode,
    payload: JSON.stringify(payload),
  };
  const logLine = JSON.stringify(logEntry) + '\n';
  try {
    await fs.appendFile(LOG_FILE_PATH, logLine, 'utf8');
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Google OAuth setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only JPEG/PNG images are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Ensure uploads directory exists
fs.mkdir('uploads', { recursive: true }).catch(console.error);

// Middleware to log requests
app.use(async (req, res, next) => {
  res.on('finish', async () => {
    await logApiCall(req.method, req.path, res.statusCode, {
      body: req.body,
      query: req.query,
      params: req.params,
    });
  });
  next();
});

// Root route
app.get('/', (req, res) => res.send('Welcome to the GastroVision AI Backend'));

// Authentication endpoints
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar, token });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/google-login', async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, avatar: picture });
      await user.save();
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar, token });
  } catch (error) {
    console.error('Google login error:', error.message);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

// Image prediction endpoint
app.post('/api/predict', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Call Python service for prediction
    const { predicted_class, confidence, heatmap_path } = await classifyWithPython(req.file.path);

    // Save prediction to database
    const prediction = new Prediction({
      userId: req.user.id,
      imagePath: req.file.path,
      predictedClass: predicted_class,
      confidence,
      heatmapPath: heatmap_path,
    });
    await prediction.save();

    res.json({
      predictionId: prediction._id,
      predictedClass: predicted_class,
      confidence,
      heatmapPath: heatmap_path,
    });
  } catch (error) {
    console.error('Error processing image:', error.message);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Get predictions for a user
app.get('/api/predictions', verifyToken, async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    console.error('Error fetching predictions:', error.message);
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

// Save annotations
app.post('/api/annotate', verifyToken, async (req, res) => {
  try {
    const { predictionId, annotations } = req.body;
    if (!predictionId || !annotations) {
      return res.status(400).json({ error: 'Prediction ID and annotations are required' });
    }

    const annotation = new Annotation({
      userId: req.user.id,
      predictionId,
      annotations,
    });
    await annotation.save();
    res.status(201).json(annotation);
  } catch (error) {
    console.error('Error saving annotation:', error.message);
    res.status(500).json({ error: 'Failed to save annotation' });
  }
});

// Get model metrics
app.get('/api/metrics', verifyToken, async (req, res) => {
  try {
    // Mock metrics (replace with actual model evaluation)
    const metrics = {
      accuracy: 0.943,
      confusionMatrix: [
        [100, 5, 2, 1],
        [3, 95, 4, 2],
        [1, 2, 90, 5],
        [0, 1, 3, 88]
      ],
      classes: ['Normal', 'Ulcerative Colitis', 'Polyps', 'Esophagitis'],
    };
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error.message);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get bias analysis
app.get('/api/bias', verifyToken, async (req, res) => {
  try {
    // Mock bias metrics (replace with actual analysis)
    const biasMetrics = {
      classAccuracy: {
        Normal: 0.95,
        'Ulcerative Colitis': 0.92,
        Polyps: 0.90,
        Esophagitis: 0.89
      },
      fairnessScore: 0.92
    };
    res.json(biasMetrics);
  } catch (error) {
    console.error('Error fetching bias metrics:', error.message);
    res.status(500).json({ error: 'Failed to fetch bias metrics' });
  }
});

// Initialize log directory
ensureLogDir().catch(console.error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));