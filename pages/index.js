import Head from "next/head"
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList"



function HomePage(props){
    console.log(props)
    return <>
    <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse a huge list of highly active React meetups!" />
    </Head>
    <MeetupList meetups={props.meetups}/>
    </>
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }



//reserved name, runs on server during build
export async function getStaticProps(){
    const MONGODB_URL = process.env.MONGODB_URL
    const client = await MongoClient.connect(MONGODB_URL)
    const db = client.db()
    const meetupsCollection = db.collection("meetups")
    const meetups = await meetupsCollection.find().toArray()
    client.close()
    return {
            props:  {
                meetups: meetups.map((meetup) => ({
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString(), // Convert the ObjectId to a string
                })),
            },
            revalidate: 1
        }
}


export default HomePage