
const express = require('express')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xcxqb.mongodb.net/emaJohn?retryWrites=true&w=majority`;

const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("emaJohn").collection("emaJohn69");
  const addOrderCollection = client.db("emaJohn").collection("addOder");

  app.post('/addProduct', (req, res) => {
      const products =req.body;
      collection.insertOne(products)
      .then(result => {
          res.send(result.insertedCount>0)
          console.log(result)
      })
  })


app.get('/product', (req, res) => {
    collection.find({})
    .toArray((err,document)=>{
        res.send(document);
    })
})


app.get('/product/:key', (req, res) => {
    
    collection.find({key: req.params.key})
    .toArray( (err, document) => {
        res.send(document[0]);
    })
})

app.post('/productBook', (req,res)=>{
    const productKeys = req.body;
    collection.find({key: { $in: productKeys} })
    .toArray( (err, documents) => {
        res.send(documents);
    })
})


app.post('/addOrder', (req, res) => {
    const addOrder =req.body;
    addOrderCollection.insertOne(addOrder)
    .then(result => {
        res.send(result.insertedCount>0)
        console.log(result)
    })
})


});







app.listen(process.env.PORT || port)