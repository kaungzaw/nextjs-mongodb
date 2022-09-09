import Head from "next/head";
import { useQuery } from "@apollo/client";
import { getSession } from "@auth0/nextjs-auth0";
import { GET_POSTS } from "graphql/gqls/post";
import clientOnly from "utils/clientOnly";
import Post from "components/Post";

export const getServerSideProps = async ({ req, res }) => {
  const { user = null } = getSession(req, res) ?? {};
  return {
    props: { user },
  };
};

function Home({ user }) {
  const { data: { posts = [] } = {}, loading, error } = useQuery(GET_POSTS);

  return (
    <>
      <Head>
        <title>SNS - Home</title>
      </Head>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>error {error.message}</div>
      ) : posts.length === 0 ? (
        <div>No Posts created yet.</div>
      ) : (
        posts.map((item, index) => (
          <div
            key={item._id}
            style={index < posts.length - 1 ? { marginBottom: "20px" } : {}}
          >
            <Post post={item} user={user} />
          </div>
        ))
      )}
    </>
  );
}

export default clientOnly(Home);
