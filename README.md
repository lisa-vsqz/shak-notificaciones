# Queue Manager API

Este proyecto es un gestor de colas que utiliza RabbitMQ para manejar mensajes y colas. La API proporciona varios endpoints para crear y eliminar colas, consumir mensajes y enviar mensajes a través de un intercambio fanout.

## Instalación

1. Clona el repositorio
    ```sh
    git clone https://github.com/tu-usuario/queue-manager.git
    ```
2. Navega al directorio del proyecto
    ```sh
    cd queue-manager
    ```
3. Instala las dependencias
    ```sh
    npm install
    ```
4. Configura RabbitMQ (Asegúrate de tener un servidor RabbitMQ en funcionamiento)
    ```sh
    # Configuración de ejemplo en src/rabbitmq/config.js
    module.exports = {
        rabbitmqUrl: 'amqp://localhost',
        queueName: 'your-queue-name',
    };
    ```

## Uso

Para iniciar el servidor:
```sh
npm start
```

El servidor estará disponible en http://localhost:3000.

## Endpoints
Crear Intercambio
```http
POST /createExchange
```
Crea un intercambio fanout.

Request Body
```json
{
    "exchange": "exchange_name"
}
```
Response
```json
{
    "message": "Fanout exchange exchange_name created successfully."
}
```
Eliminar Cola
```http
DELETE /deleteQueue/:queue
```
Elimina una cola especificada.

URL Params
- queue: El nombre de la cola a eliminar.
Response
```json
{
    "message": "Queue queue_name deleted successfully."
}
```
Enviar Mensaje
```http
POST /sendMessage
```
Envía un mensaje a un intercambio.

Request Body
```json
{
    "exchange": "exchange_name",
    "message": "your_message"
}
```
Response
```json
{
    "message": "Message published to exchange exchange_name successfully."
}
```
Consumir Mensajes
```http
POST /consumeMessages
```
Consume mensajes de un intercambio y los envía por correo electrónico.

Request Body
```json
{
    "exchange": "exchange_name",
    "email": "email@example.com"
}
```
Response
```json
{
    "message": "Consuming messages from exchange exchange_name and sending to email@example.com."
}
```
Estructura del Proyecto
```plaintext
src/
├── rabbitmq/
│   ├── config.js
│   ├── rabbitmq.js
├── routes/
│   ├── createExchange.js
│   ├── deleteQueue.js
│   ├── sendMessage.js
│   ├── consumeMessages.js
├── app.js
```
