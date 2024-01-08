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
  
	let chatCompletion = await stream.finalChatCompletion();
	await generateFairyTalePicture(chatCompletion.choices[0].message.content)
}

async function generateFairyTalePicture(fairyTaleStory){
	console.log("Generating the image")
	let prompt = "Generate a painting representing the following fairy tale: " + fairyTaleStory
	console.log(prompt)
	try{
		let response = await openai.images.generate({
			model: "dall-e-3",
			prompt: prompt,
			n: 1,
			size: "1024x1024",
		})

		let image_url = response.data[0].url
		console.log("Image: " + image_url)
	}catch(err){
		console.log(err)
	}

	
}

module.exports.generateFairytale = generateFairytale;