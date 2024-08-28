import { lazy } from "react";
import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { UserModel } from "../../features/user-management/userSlice";
import { RootState } from "../../store";

import Main from "../../components/templates/main/Main";
import User from "../../components/organisms/user/User";
import PageNav from "../../components/organisms/page-nav/PageNav";
import Button from "../../components/atoms/button/Button";

import styles from "./PostsPage.module.scss";

const PostList = lazy(
  () => import("../../components/organisms/post-list/PostList")
);

function PostsPage() {
  const { id } = useParams();

  const user = useSelector((state: RootState) =>
    state.userManagement.find((user) => Number(user.id) === Number(id))
  ) as UserModel;

  return (
    <>
      <PageNav />
      <Main className={styles.postsPageLayout}>
        {user &&
          <User key={id} {...user} userNavigation={
            <>
              <span>{user.username}</span>
              <Link to="/">
                <Button>Go back</Button>
              </Link>
            </>
          } />
        }
        <PostList />
      </Main>
    </>
  );
}

export default PostsPage;
