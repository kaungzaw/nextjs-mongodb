import Head from "next/head";
import { useRouter } from "next/router";

const PostById = () => {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <>
      <Head>
        <title>SNS - Post</title>
      </Head>
      <div>post by _id {_id}</div>
    </>
  );
};

export default PostById;
