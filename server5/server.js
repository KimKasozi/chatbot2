import express from 'express';
const app = express();

app.use(express.json());

app.get('/', async(req, res) =>{
  res.sendStatus(200).send({
    message: "Server is functional!!",
  })
});

app.post("/location", (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

 console.log(latitude, longitude);
});



app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
