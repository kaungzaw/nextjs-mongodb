import Head from "next/head";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { CREATE_POST, GET_POSTS } from "graphql/gqls/post";

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const { user } = getSession(req, res);
    return {
      props: { user },
    };
  },
});

const CreatePost = ({ user }) => {
  const { email } = user;
  const [form] = Form.useForm();

  const [createPost, { loading }] = useMutation(CREATE_POST);

  async function onFinish(values) {
    try {
      await createPost({
        variables: { data: values },
        update(cache, { data: { createPost } }) {
          // /posts/index
          const data = cache.readQuery({
            query: GET_POSTS,
            variables: {
              filter: { createdBy: email },
            },
          });

          if (data) {
            cache.writeQuery({
              query: GET_POSTS,
              variables: {
                filter: { createdBy: email },
              },
              data: { posts: [createPost, ...data.posts] },
            });
          }

          // /
          const data2 = cache.readQuery({ query: GET_POSTS });

          if (data2) {
            cache.writeQuery({
              query: GET_POSTS,
              data: { posts: [createPost, ...data2.posts] },
            });
          }
        },
      });

      form.resetFields();
      message.success("Post created successfully.");
    } catch (error) {
      console.error(error);
      message.error("Failed to create Post.");
    }
  }

  return (
    <>
      <Head>
        <title>SNS - Create Post</title>
      </Head>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Text" name="text" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePost;
