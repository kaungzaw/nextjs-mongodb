import { useQuery } from "@apollo/client";
import { GET_POSTS } from "graphql/gqls/post";
import clientOnly from "utils/clientOnly";
import Post from "components/Post";

function Home() {
  const { data: { posts = [] } = {}, loading, error } = useQuery(GET_POSTS);

  return (
    <>
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
            <Post post={item} />
          </div>
        ))
      )}
    </>
  );
}

export default clientOnly(Home);
