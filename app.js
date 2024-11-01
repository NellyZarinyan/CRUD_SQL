const express = require('express');
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('views')); // Serve static files from the views directory

// Sync Sequelize with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => console.error('Error creating database tables:', error));


const routes = require('./routes/taskRoutes')
app.use(routes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
