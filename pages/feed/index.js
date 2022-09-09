import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function Feed() {
  return (
    <>
      <Head>
        <title>SNS - Feed</title>
      </Head>
      <div>feed</div>
    </>
  );
}

export default withPageAuthRequired(Feed);
