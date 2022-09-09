import { useQuery } from "@apollo/client";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { GET_POSTS } from "graphql/gqls/post";
import clientOnly from "utils/clientOnly";
import Post from "components/Post";

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const { user } = getSession(req, res);
    return {
      props: { user },
    };
  },
});

const Posts = ({ user }) => {
  const { email } = user;
  const {
    data: { posts = [] } = {},
    loading,
    error,
  } = useQuery(GET_POSTS, {
    variables: {
      filter: { createdBy: email },
    },
  });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : posts.length === 0 ? (
        <div>No Posts created yet.</div>
      ) : (
        posts.map((item, index) => (
          <div
            key={item._id}
            style={index < posts.length - 1 ? { marginBottom: "20px" } : {}}
          >
            <Post post={item} edit={true} user={user} />
          </div>
        ))
      )}
    </>
  );
};

export default clientOnly(Posts);
