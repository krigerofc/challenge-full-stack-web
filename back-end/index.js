require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve a small test page
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api/students', studentRoutes);

// Global error handler to normalize responses
app.use((err, req, res, next) => {
	console.error(err);
	const status = err.status || (err.code === 'P2002' ? 409 : 500);
	const message = err.message || (err.meta?.target ? `${err.meta.target.join(', ')} already exists` : 'Internal Server Error');
	res.status(status).json({ error: message });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
	app.listen(port, () => console.log(`API running on http://localhost:${port}`));

	process.on('unhandledRejection', (reason) => {
		console.error('Unhandled Rejection:', reason);
	});
}

module.exports = app;