import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function Feed() {
  return <div>feed</div>;
}

export default withPageAuthRequired(Feed);
