const auth = require('./routes/auth');
const connectDB = require('./config/db');
const contacts = require('./routes/contacts');
const express = require('express');
const path = require('path');
const users = require('./routes/users');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/users', users);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
