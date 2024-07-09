// src/routes/deleteQueue.js

const express = require('express');
const router = express.Router();
const { deleteQueue } = require('../rabbitmq/rabbitmq');

router.delete('/:queue', async (req, res) => {
    const { queue } = req.params;

    try {
        await deleteQueue(queue);
        res.status(200).send({ message: `Queue ${queue} deleted successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete queue' });
    }
});

module.exports = router;
