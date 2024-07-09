const express = require('express');
const router = express.Router();
const { createQueue } = require('../rabbitmq/rabbitmq');

router.post('/', async (req, res) => {
    const { exchange } = req.body;

    try {
        await createQueue(exchange);
        res.status(200).send({ message: `Fanout exchange ${exchange} created successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create fanout exchange' });
    }
});

module.exports = router;
