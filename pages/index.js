import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     image:
//       "https://www.jetsetter.com//uploads/sites/7/2018/04/s0i_qgfG-1380x690.jpeg",
//     title: "Meetup 1",
//     address: "Some address",
//     description: "This is the 1st meetup.",
//   },
//   {
//     id: "m2",
//     image:
//       "https://www.jetsetter.com//uploads/sites/7/2018/04/s0i_qgfG-1380x690.jpeg",
//     title: "Meetup 2",
//     address: "Some other address",
//     description: "This is the 2nd meetup.",
//   },
//   {
//     id: "m3",
//     image:
//       "https://www.jetsetter.com//uploads/sites/7/2018/04/s0i_qgfG-1380x690.jpeg",
//     title: "Meetup 3",
//     address: "Some different address",
//     description: "This is the 3rd meetup.",
//   },
//   {
//     id: "m4",
//     image:
//       "https://www.jetsetter.com//uploads/sites/7/2018/04/s0i_qgfG-1380x690.jpeg",
//     title: "Meetup 4",
//     address: "Some other different address",
//     description: "This is the 4th meetup.",
//   },
// ];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data or whatever

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://vivekmitra98:learnreactjs@cluster0.mknq0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find().toArray();

  client.close();

  const meetups = result.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
    };
  });

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 10,
  };
};

export default HomePage;
