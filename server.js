const express = require('express');
const bodyParser = require('body-parser');
const createQueue = require('./routes/createQueue');
const sendMessage = require('./routes/sendMessage');
const deleteQueue = require('./routes/deleteQueue');
const consumeMessages = require('./routes/consumeMessages');

const app = express();

app.use(bodyParser.json());

app.use('/api/queues', createQueue);
app.use('/api/messages', sendMessage);
app.use('/api/queues', deleteQueue);
app.use('/api/consume', consumeMessages);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
