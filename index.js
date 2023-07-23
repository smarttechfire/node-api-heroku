import express from "express";
import cors from 'cors'
import 'dotenv/config'
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI
const PORT = process.env.PORT

const client = new MongoClient(URI)
const database = client.db('vidb')
const users = database.collection('users')  

client.connect()
console.log('connected to mongodb')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('api running'))

// app.get('/',(req,res) => res.json('Here is the get route'))
app.get('/',async(req,res)=>{
    const allUsers = await users.find().toArray()
    res.json(allUsers)
})
app.post('/add', async (req,res) => {
    await users.insertOne({name: 'Pallavi',supose: 'sathish',occupation: 'Front Developer'})
    res.json('Item was added')
})