const express = require('express');
const cors = require('cors');
const socketIO = require("socket.io")
const http = require('http')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app); // Changed to use http.createServer
server.listen(port, '0.0.0.0', () => {  // Listen on all network interfaces
  console.log(`Server is running on port: ${port}`);
});

const io = socketIO(server, {
  cors: {
    origin: "*", // Change to your EC2 instance public IP if you want to restrict it
    methods: ["GET", "POST"]
  }
});

module.exports = io
require('./routes/fairytale')(app)
