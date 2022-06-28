const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
let cors = require('cors')
let bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Server is open')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zii4n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);


app.listen(port, () => {
    console.log(`server running ${port}`)
})