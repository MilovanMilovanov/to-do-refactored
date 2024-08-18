import { lazy, Suspense } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { UserModel } from "../../features/user-management/userSlice";
import { RootState } from "../../store";
import Main from "../../components/templates/main/Main";
import User from "../../components/organisms/user/User";
import PageNav from "../../components/organisms/page-nav/PageNav";

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
        <User key={id} {...user} />
        <Suspense fallback="Loading posts...">
          <PostList />
        </Suspense>
      </Main>
    </>
  );
}

export default PostsPage;
