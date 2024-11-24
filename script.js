// Function that modifies the style of the demo paragraph
function myFunction() {
    let x = document.getElementById("demo");
    x.style.fontSize = "25px";
    x.style.color = "red";
}

// Add event listener to the button
document.getElementById("clickBtn").addEventListener("click", myFunction);
// JavaScript for the text loop
const texts = ["C Language ", "C++", "Pythone ", "Html & Css","Certificate"];
let count = 0;
const textElement = document.getElementById('text-loop');

function loopText() {
    textElement.textContent = texts[count];
    count = (count + 1) % texts.length;
}

setInterval(loopText, 3000); // Change text every 3 seconds
loopText(); // Initial call to set the first text
// login
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

  // Check file size to ensure it's under 50KB
  function checkFileSize() {
    const fileInput = document.getElementById('photo');
    const fileError = document.getElementById('file-error');
    const file = fileInput.files[0];
    const maxSize = 50 * 1024; // 50KB

    if (file && file.size > maxSize) {
      fileError.style.display = 'block'; // Show error message
      fileInput.value = ''; // Clear the file input
    } else {
      fileError.style.display = 'none'; // Hide error message
    }
  }

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, userType } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        user = new User({ name, email, password, userType });
        await user.save();

        res.send('User registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        let user = await User.findOne({ email, userType });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginsystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
function startProgress() {
    const circles = document.querySelectorAll('.circle');
    let activeIndex = 0;
  
    const interval = setInterval(() => {
      if (activeIndex < circles.length - 1) {
        circles[activeIndex].classList.add('completed');
        activeIndex++;
        circles[activeIndex].classList.add('active');
      } else {
        clearInterval(interval);
      }
    }, 1000); // Updates progress every second
  }
  