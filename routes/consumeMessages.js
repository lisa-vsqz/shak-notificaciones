const express = require('express');
const router = express.Router();
const { consumeMessages } = require('../rabbitmq/rabbitmq');

router.post('/', async (req, res) => {
    const { exchange, email } = req.body;

    try {
        await consumeMessages(exchange, email); // Pass email to consumeMessages function
        res.status(200).send({ message: `Consuming messages from exchange ${exchange} and sending to ${email}.` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to consume messages and send email' });
    }
});

module.exports = router;
