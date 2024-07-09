const amqp = require('amqplib');
const nodemailer = require('nodemailer');

let connection, channel;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
        throw error;
    }
};

const createQueue = async (exchange) => {
    if (!channel) await connectRabbitMQ();
    await channel.assertExchange(exchange, 'fanout', { durable: true });
};

const sendMessage = async (exchange, message) => {
    if (!channel) await connectRabbitMQ();
    await channel.publish(exchange, '', Buffer.from(message));
};

const deleteQueue = async (queue) => {
    if (!channel) await connectRabbitMQ();
    await channel.deleteQueue(queue);
};

const consumeMessages = async (exchange, sendToEmail) => {
    if (!channel) await connectRabbitMQ();
    await channel.assertExchange(exchange, 'fanout', { durable: true });

    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, exchange, '');

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'MAIL',
            pass: 'PASSWORD'
        }
    });

    // Consume messages
    channel.consume(q.queue, (msg) => {
        if (msg !== null) {
            const message = msg.content.toString();
            console.log(`Received message: ${message}`);

            // Send email to the specified recipient
            transporter.sendMail({
                from: 'gorkyange@gmail.com',
                to: sendToEmail,
                subject: 'Message from RabbitMQ Exchange',
                text: message
            }, (err, info) => {
                if (err) {
                    console.error('Error sending email:', err);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            channel.ack(msg); // Acknowledge message
        }
    }, { noAck: false });
};

module.exports = {
    connectRabbitMQ,
    createQueue,
    sendMessage,
    deleteQueue,
    consumeMessages
};
