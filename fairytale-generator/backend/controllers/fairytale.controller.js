const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const readlineSync = require("readline-sync");
require("dotenv").config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "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", // This is the default and can be omitted
});

// function main() {
//   const chatCompletion = openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   }).then(response =>{
// 	console.log(response.message)
//   }).catch(error =>{
// 	console.log(error)
//   });
// }

// main()
async function main() {
	const stream = await openai.beta.chat.completions.stream({
	  model: 'gpt-3.5-turbo',
	  messages: [{ role: 'user', content: 'Write a fairytale' }],
	  stream: true,
	});
  
	stream.on('content', (delta, snapshot) => {
		console.log(delta);
	});
  
	// or, equivalently:
	for await (const chunk of stream) {
	//   process.stdout.write(chunk.choices[0]?.delta?.content || '');
	}
  
	const chatCompletion = await stream.finalChatCompletion();
	console.log(chatCompletion); // {id: "…", choices: […], …}
	console.log(chatCompletion.choices[0].message.content)
  }
  
  main();
exports.generate = (req, res) => {

}
// exports.generate = (req, res) => {
//     const url = "https://api.openai.com/v1/engines/gpt-4.0/completions"; // URL for GPT-4

// 	const configuration = new Configuration({
// 		apiKey: process.env.OPENAPI_API_KEY,
// 	  });
	  
// 	  const openai = new OpenAIApi(configuration);
	  
// 	  let messages = [
// 		{ role: 'system', content: 'You are a helpful assistant.' },
// 	  ];
	  
// 	const completion = openai.createCompletion({
// 		model: 'gpt-4.0',
// 		prompt: 'generate a fairytale',
// 		maxTokens: 1024,
// 		n: 1,
// 		temperature: 0.8,
// 	}).then(response => {
// 		console.log(response)
// 		console.log("Got a response")
// 		res.send(response.data.choices[0].text);
// 	}).catch(err =>{
// 		console.log(err)
// 		res.status(500).send({
// 			message: err.message || "Some error occurred calling gpt API."
// 		});
// 	});
// }