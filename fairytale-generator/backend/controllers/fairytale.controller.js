const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const readlineSync = require("readline-sync");
require("dotenv").config();
const OpenAI = require('openai');
const io = require("../server")

const openai = new OpenAI({
  apiKey: "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", // This is the default and can be omitted
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Emitting data to the client
  socket.emit('message', 'Hello from the server!');

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
async function generateFairytale() {
	console.log(io.engine.clientsCount)
	io.emit("message", "to all clients")
	const stream = await openai.beta.chat.completions.stream({
	  model: 'gpt-3.5-turbo',
	  messages: [{ role: 'user', content: 'Write a fairytale' }],
	  stream: true,
	});
  
	stream.on('content', (delta, snapshot) => {
		console.log(delta);
		io.emit("message", delta)
	});
  
	// or, equivalently:
	for await (const chunk of stream) {
	//   process.stdout.write(chunk.choices[0]?.delta?.content || '');
	}
  
	const chatCompletion = await stream.finalChatCompletion();
	console.log(chatCompletion); // {id: "…", choices: […], …}
	console.log(chatCompletion.choices[0].message.content)
}

module.exports.generateFairytale = generateFairytale;