require('dotenv').config();

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

const passport = require('passport');
require('./config/passport');

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/products', productRoutes);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home Route
app.get('/', (req, res) => {
  res.send('Inventory API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());