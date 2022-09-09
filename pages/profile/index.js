import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function Profile() {
  return (
    <>
      <Head>
        <title>SNS - Create Post</title>
      </Head>
      <div>profile</div>
    </>
  );
}
