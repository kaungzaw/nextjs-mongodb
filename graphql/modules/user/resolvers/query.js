import { find } from "utils/crud";

const query = {
  users: async () => {
    const users = await find("users");
    return users;
  },
};

export default query;
