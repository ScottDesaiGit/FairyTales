const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const readlineSync = require("readline-sync");
require("dotenv").config();
const OpenAI = require('openai');
const io = require("../server")

const openai = new OpenAI({
  apiKey: process.env.OPENAPI_API_KEY // This is the default and can be omitted
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

function generatePrompt(formData){
	// Start with a basic prompt
    let prompt = "Write a fairytale";

    // Add details based on the formData provided
    if (formData.protagonistName) {
        prompt += ` about ${formData.protagonistName}`;
        if (formData.protagonistDescription) {
            prompt += `, a ${formData.protagonistDescription}`;
        }
    }else if(formData.protagonistDescription){
		` about a ${formData.protagonistDescription}`
	}

    if (formData.setting) {
        prompt += formData.protagonistName ? ` in a setting of ${formData.setting}` : ` set in ${formData.setting}`;
    }
    if (formData.sideCharacters) {
        prompt += `. Include side characters: ${formData.sideCharacters}`;
    }
    if (formData.plotPoints) {
        prompt += `. The plot should involve: ${formData.plotPoints}`;
    }
	return prompt
}

async function generateFairytale(formData, socketId) {
	let prompt = generatePrompt(formData)
	let wordCount = 0
	let wordArr = []
	try{
		const stream = await openai.beta.chat.completions.stream({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: prompt}],
		stream: true,
		});
	
		stream.on('content', (delta, snapshot) => {
			console.log(delta);
			wordCount++;
			wordArr.push(delta)
			if(wordCount % 20 == 0){
				let currSentence = wordArr.slice((wordCount - 20)).join("")
				io.to(socketId).emit("message", currSentence)
				if(wordCount == 40){
					generateFairyTalePicture(wordArr.join(""), "1", socketId)
				}
			}
		});
	
		let chatCompletion = await stream.finalChatCompletion();
		io.to(socketId).emit("message", wordArr.slice(wordCount - (wordCount % 20)).join(""))
		await generateFairyTalePicture(chatCompletion.choices[0].message.content, "2", socketId)
	}catch(err){
		console.log(err)
	}
  
}

async function generateFairyTalePicture(fairyTaleStory, pictureNumber, socketId){
	console.log("Generating the image")
	let prompt = "Generate a singular painting representing the following fairy tale with no text or borders: " + fairyTaleStory
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
		io.to(socketId).emit(`newImage${pictureNumber}`, image_url)
	}catch(err){
		console.log(err)
	}

	
}

module.exports.generateFairytale = generateFairytale;