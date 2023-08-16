const express = require('express');

const app = express();

const auth = require('./routes/auth');
const contacts = require('./routes/contacts');
const users = require('./routes/users');

app.get('/', (request, response) => response.json({ message: 'Welcome to ContactManager API' }));

app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
