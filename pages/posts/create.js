import Head from "next/head";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CREATE_POST } from "graphql/gqls/post";

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const { user } = getSession(req, res);
    return {
      props: { user },
    };
  },
});

const CreatePost = () => {
  const [form] = Form.useForm();

  const [createPost, { loading }] = useMutation(CREATE_POST);

  async function onFinish(values) {
    try {
      await createPost({
        variables: { data: values },
        update(cache, { data: { createPost } }) {
          // /posts/index
          const data = cache.readQuery({
            query: getPosts,
            variables: {
              filter: { createdBy: "9Xa5-Fc9j2cQVJ7vrvGNMlSa6mAdMe15" },
            },
          });

          if (data) {
            cache.writeQuery({
              query: getPosts,
              variables: {
                filter: { createdBy: "9Xa5-Fc9j2cQVJ7vrvGNMlSa6mAdMe15" },
              },
              data: { posts: data.posts.concat([createPost]) },
            });
          }

          // /
          const data2 = cache.readQuery({ query: getPosts });

          if (data2) {
            cache.writeQuery({
              query: getPosts,
              data: { posts: data2.posts.concat([createPost]) },
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
