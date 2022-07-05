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

async function run(){
    
    try{
        await client.connect();
        const dataCollection = client.db('doctors_protal_treatment').collection('services');
        const bookingCollection = client.db('doctors_protal_treatment').collection('booking');
        const userCollection = client.db('doctors_protal_treatment').collection('user');

        app.get('/service', async(req,res)=>{
            const query={};
            const cursor = await dataCollection.find(query).toArray();
            res.send(cursor)
        })
        // data pass for email for patient 
        app.get('/booking', async (req, res) => {
            const patientEmail = req.query.patientEmail;
            const query = { patientEmail: patientEmail };
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
          })

        app.post('/booking', async(req,res)=>{
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            return res.send(result);
        })
        app.put('/user/:email', async(req,res)=>{
            const email = req.params.email;
            const user = req.body;
            const filter = {email:email};
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
              };
              const result = await userCollection.updateOne(filter,updateDoc, options);
              res.send(result);
        })

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`server running ${port}`)
})