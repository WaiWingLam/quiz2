const mongoose = require('mongoose');

const bodyParser = require('body-parser')
const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object

const Schema = mongoose.Schema

const w24students = new Schema({
  name: {type: String, required: true},
  studentID: {type: Number, required: true}
})

const Winter24 = mongoose.model("w24students", w24students)

// This Activitry creates the collection called activitimodels

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form

  uri = req.body.myuri

  console.log(uri)


  // connect to the database and log the connection
  // mongodb://localhost:27017/Winter24

  mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    })
    .then(() =>{
        console.log('Connected to MongoDB')
    })

  // add the data to the database
    const me = new Winter24({
      name: "Wai Wing Lam",
      studentID: 300370556
    })

    resolveAfter2Seconds()
    .then(me.save())
    
    function resolveAfter2Seconds() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
    }

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
