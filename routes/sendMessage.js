const express = require('express');
const router = express.Router();
const { sendMessage } = require('../rabbitmq/rabbitmq');

router.post('/', async (req, res) => {
    const { exchange, message } = req.body;

    try {
        await sendMessage(exchange, message);
        res.status(200).send({ message: `Message published to exchange ${exchange} successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to publish message' });
    }
});

module.exports = router;
