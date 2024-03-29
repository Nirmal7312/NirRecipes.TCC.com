const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipes_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/recipes', require('./routes/recipes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
