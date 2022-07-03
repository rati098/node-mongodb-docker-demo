const express = require('express')
const path = require('path')
const app = express()
const MongoClient = require('mongodb').MongoClient;

const port = 3000

const MONGO_URL='mongodb://ec2-54-91-122-24.compute-1.amazonaws.com:27017/user';

app.get('/', (req, res) => {
    res.sendFile('profile.html', { root: path.join(__dirname, './src') })
})
app.post('/save', (req, res) => {
    console.log('Received save post request');
    MongoClient.connect(MONGO_URL,(err, db)=>{
        if(err) throw err;
        console.log('MongoDB Connected');        
        res.send("data saved!")
        db.close();
    })
})  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})