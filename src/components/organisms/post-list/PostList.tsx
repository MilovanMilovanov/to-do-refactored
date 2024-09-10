import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../store";
import { deletePost, setPosts } from "../../../features/user-posts/postsSlice";

import useApi from "../../../hooks/useApi/useApi";
import Button from "../../atoms/button/Button";
import Post, { addPostFormId } from "../post/Post";
import Accordion from "../accordion/Accordion";
import Popup from "../../molecules/Popup/Popup";
import Scrollable from "../../shared/scrollable/Scrollable";

import styles from "./PostList.module.scss";

function PostList() {
  const { id } = useParams();
  const { request } = useApi();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const posts = useSelector((state: RootState) => state.userPosts[Number(id)]);

  useEffect(() => {
    async function fetchUserPosts() {
      const posts = await request({
        endpoint: "posts",
        params: {
          userId: id,
        },
      });

      dispatch(setPosts(posts));
    }
    if (!posts) fetchUserPosts();
  }, [id, posts, request, dispatch]);

  const handleTogglePost = (id: string) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  const handleDeletePost = () => {
    request({
      method: "DELETE",
      endpoint: `posts/${deleteItemId}`,
    });

    dispatch(deletePost({ postId: deleteItemId, userId: Number(id) }));
  };

  const handleConfirmationPopup = (id: number) => {
    setIsPopupOpen(true);
    setDeleteItemId(id);
  };

  return (
    <Popup
      message={`Are you sure you want to delete post with id: ${deleteItemId}?`}
      className={styles.confirmDialog}
      isOpen={isPopupOpen}
      setIsOpen={setIsPopupOpen}
      action={handleDeletePost}
    >
      <Scrollable
        className={`${styles.postList} ${
          isPopupOpen ? styles["postList--removeBorder"] : ""
        }`}
        tagName={"ul"}
        isScrollingEnabled={!isPopupOpen}
      >
        <li>
          <Accordion
            id={addPostFormId}
            title="Add New Post"
            isCollapsed={expandedItemId !== "add-post"}
            toggleElement={() => handleTogglePost("add-post")}
          >
            <Post isAddPost={true} userId={Number(id)} />
          </Accordion>
        </li>
        {posts?.map((post) => (
          <li key={post.id} className={styles.postSection}>
            <Accordion
              title={String(post.id)}
              isCollapsed={expandedItemId !== String(post.id)}
              id={String(post.id)}
              toggleElement={handleTogglePost}
            >
              <Post {...post} />
            </Accordion>

            <Button
              className={styles.btnDelete}
              aria-label="Delete Post"
              onClick={() => handleConfirmationPopup(post.id)}
            >
              Delete Post
            </Button>
          </li>
        ))}
      </Scrollable>
    </Popup>
  );
}

export default PostList;
