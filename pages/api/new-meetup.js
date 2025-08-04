//ap/new-meetup.js
import {MongoClient} from 'mongodb'
async function handler(req, res){
    console.log(req)
    if (req.method == "POST") {
        const data = req.body

        const MONGODB_URL = process.env.MONGODB_URL
        const client = await MongoClient.connect(MONGODB_URL)
        const db = client.db()

        const meetupsCollection = db.collection("meetups")

        const result = await meetupsCollection.insertOne(data)

        console.log(result)
        client.close()
        return res.status(201).json({message: "Meetup inserted!"})
    }
}

export default handler