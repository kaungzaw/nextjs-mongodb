import { Card, Avatar, Dropdown, Menu, Modal, message } from "antd";
import {
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useApolloClient, useMutation } from "@apollo/client";
import { LIKE_POST, DISLIKE_POST, DELETE_POST } from "graphql/gqls/post";
import Link from "next/link";
import styles from "./Post.module.css";

export default function Post({ post, edit = false }) {
  const apolloClient = useApolloClient();

  const [deletePost] = useMutation(DELETE_POST);

  async function handleAction(action) {
    if (action === "like") {
      await apolloClient.mutate({
        mutation: LIKE_POST,
        variables: {
          _id: post._id,
        },
      });
    } else if (action === "dislike") {
      await apolloClient.mutate({
        mutation: DISLIKE_POST,
        variables: {
          _id: post._id,
        },
      });
    } else if (action === "delete") {
      Modal.confirm({
        title: "Do you want to delete this Post?",
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          try {
            await deletePost({
              variables: { _id: post._id },
              update(cache, { data: { deletePost } }) {
                const normalizedId = cache.identify({
                  id: deletePost._id,
                  __typename: "Post",
                });
                cache.evict({ id: normalizedId });
                cache.gc();
              },
            });
            message.success("Post deleted sucessfully.");
          } catch (error) {
            console.error(error);
            message.error("Failed to delete Post.");
          }
        },
        onCancel() {},
      });
    }
  }

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: "edit",
          label: "Edit",
        },
        {
          key: "delete",
          label: "Delete",
        },
      ]}
      onClick={({ key }) => handleAction(key)}
    />
  );

  return (
    <Card
      size="small"
      actions={[
        <div key="like" onClick={() => handleAction("like")}>
          {post.like}&nbsp;&nbsp;
          <LikeOutlined />
        </div>,
        <div key="dislike" onClick={() => handleAction("dislike")}>
          {post.dislike}&nbsp;&nbsp;
          <DislikeOutlined />
        </div>,
        <div key="comment" onClick={() => handleAction("comment")}>
          0&nbsp;&nbsp;
          <CommentOutlined />
        </div>,
        ...(edit
          ? [
              <Dropdown key="edit" overlay={dropdownMenu} trigger={["click"]}>
                <EditOutlined />
              </Dropdown>,
            ]
          : []),
      ]}
    >
      <Card.Meta
        avatar={
          <Link href="/profile">
            <a style={{ color: "inherit" }}>
              <Avatar icon={<UserOutlined />} size={54} />
            </a>
          </Link>
        }
        title={
          <Link href="/profile">
            <a style={{ color: "inherit" }}>{post.createdBy}</a>
          </Link>
        }
        description={post.createdAt}
      />
      <Link href={`/posts/${post._id}`}>
        <a style={{ color: "inherit" }}>
          <div style={{ paddingTop: "16px" }}>{post.text}</div>
        </a>
      </Link>
    </Card>
  );
}
