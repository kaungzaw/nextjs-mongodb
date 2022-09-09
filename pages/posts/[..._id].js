import { useRouter } from "next/router";

const PostById = () => {
  const router = useRouter();
  const { _id } = router.query;

  return <div>post by _id {_id}</div>;
};

export default PostById;
