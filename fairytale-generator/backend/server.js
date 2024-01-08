const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require("socket.io")
const http = require('http')

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = "mongodb://localhost:27017/Todo";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = socketIO(server, 
  {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Emitting data to the client
//   socket.emit('message', 'Hello from the server!');

//   // Handling disconnection
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

module.exports = io
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
require('./routes/fairytale')(app)

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

