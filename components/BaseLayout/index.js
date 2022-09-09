import { useRouter } from "next/router";
import Link from "next/link";
import { Layout, Menu, Typography, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "./BaseLayout.module.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const BaseLayout = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const items = [
    {
      label: <Link href="/">Home</Link>,
      key: "/",
    },
    {
      label: <Link href="/feed">Feed</Link>,
      key: "feed",
    },
  ];

  const dropdownMenu = (
    <Menu
      items={[
        ...(!isLoading && user
          ? [
              {
                key: "profile",
                label: (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/profile"
                  >
                    Profile
                  </Link>
                ),
              },
              {
                key: "myPosts",
                label: (
                  <Link target="_blank" rel="noopener noreferrer" href="/posts">
                    My Posts
                  </Link>
                ),
              },
              {
                key: "newPost",
                label: (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/posts/create"
                  >
                    Create Post
                  </Link>
                ),
              },
              {
                key: "signOut",
                label: (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/api/auth/logout"
                  >
                    Sign Out
                  </Link>
                ),
              },
            ]
          : [
              {
                key: "signIn",
                label: (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/api/auth/login"
                  >
                    Sign In
                  </Link>
                ),
              },
            ]),
      ]}
    />
  );

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          padding: "0px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title level={3} className={styles.logo}>
            SNS
          </Title>
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            defaultSelectedKeys={[router.asPath.split("/")[1] || "/"]}
            style={{ width: "100%" }}
          />
          <Dropdown
            overlay={dropdownMenu}
            trigger={["click"]}
            disabled={isLoading}
          >
            <a style={{ marginLeft: "auto" }}>
              <Avatar
                size={46}
                icon={isLoading || (!user && <UserOutlined />)}
                onClick={(e) => e.preventDefault()}
              >
                {user?.name?.match(/\b(\w)/g)?.join("")}
              </Avatar>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content>
        <div className={styles.site_layout_content}>{children}</div>
      </Content>
    </Layout>
  );
};

export default BaseLayout;
