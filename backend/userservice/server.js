const express = require('express');
const { sequelize } = require('./src/models');
const userRoutes = require('./src/routes/userRoutes');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/users', userRoutes);

// Sync database and start the server
sequelize.sync({ force: false }) // Set to true only if you want to drop and recreate tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`User Service running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));
