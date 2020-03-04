const express = require('express');
const app = express();
require('colors');

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`web app listening to  ${PORT}`.bgBlue));
