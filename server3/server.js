import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';


dotenv.config();

const access_token = process.env.SUMMARY_API_TOKEN;
console.log("yes");
const app = express();
app.use(cors());
app.use(express.json());
app.post('/', async(req, res) =>{
  try{
const text =req.body.text
const options = {
  method: 'POST',
  url: 'https://gpt-summarization.p.rapidapi.com/summarize',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': SUMMARY_API_TOKEN,
    'X-RapidAPI-Host': 'gpt-summarization.p.rapidapi.com'
  },
  data: {
    text : `${text}`,
    num_sentences: 1
  }
};

try {
	const response = await axios.request(options);
	//console.log(response.data(text));
  const summarizedText = response.data;
  const message = summarizedText.summary;
  const text1 =JSON.stringify(message)
  console.log(text1)
  res.status(200).send({message: "Let's have that for today!!"});
} catch (error) {
	console.error(error);
}
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: error.message });
  }
});
console.log("amazing");
app.listen(8060, () => console.log('Server is running on port http://localhost:8060'));