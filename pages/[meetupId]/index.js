import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupDetais from "../../components/meetups/MeetupDetails";

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

const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetais
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://vivekmitra98:learnreactjs@cluster0.mknq0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  const paths = result.map((meetup) => {
    return { params: { meetupId: meetup._id.toString() } };
  });

  // console.log(paths);

  return {
    fallback: false,
    paths: paths,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  // console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://vivekmitra98:learnreactjs@cluster0.mknq0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
};

export default MeetupDetailPage;
