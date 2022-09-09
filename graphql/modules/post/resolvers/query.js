import { find } from "utils/crud";

const query = {
  posts: async (_root, args) => {
    const { filter = {} } = args;
    const posts = await find("posts", filter);
    return posts;
  },
};

export default query;
