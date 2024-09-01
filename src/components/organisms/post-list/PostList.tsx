import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { RootState } from "../../../store";
import {
  addPost,
  deletePost,
  PostModel,
  setPosts,
} from "../../../features/user-posts/postsSlice";

import useApi from "../../../hooks/useApi/useApi";
import Button from "../../atoms/button/Button";
import Post from "../post/Post";
import Form from "../../molecules/form/Form";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";
import Textarea from "../../atoms/textarea/Textarea";
import Accordion from "../accordion/Accordion";
import Popup from "../../molecules/Popup/Popup";
import Scrollable from "../../shared/scrollable/Scrollable";

import styles from "./PostList.module.scss";

export type PostFormModel = Pick<PostModel, "title" | "body">;

const initialFormData: PostFormModel = {
  title: "",
  body: "",
};

function PostList() {
  const { id } = useParams();
  const { request } = useApi();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { handleSubmit, register, getValues, reset } = useForm<PostFormModel>({
    defaultValues: initialFormData,
    mode: "onSubmit",
  });
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

  const onSubmit = () => {
    request({
      method: "POST",
      endpoint: "posts",
      body: JSON.stringify(getValues()),
    });

    dispatch(addPost({ ...getValues(), userId: Number(id), id: 0 }));
    setExpandedItemId(null);
    reset(initialFormData);
  };

  const addPostFormId = "Add-post-form";
  const titleInputId = "add-post-title";
  const textareaId = "add-post-body";

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
          isPopupOpen && styles["postList--removeBorder"]
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
            <Form
              id={addPostFormId}
              title="Add Post"
              className={styles.createPostForm}
              onSubmit={handleSubmit(onSubmit)}
              buttons={
                <Button type="submit" className={styles.btnAddPost}>
                  + Add Post
                </Button>
              }
            >
              <Label htmlFor={titleInputId} className={styles.labelText}>
                Title:
              </Label>
              <Input
                id={titleInputId}
                {...register("title")}
                placeholder="Enter your title"
                className={styles.postInput}
              />
              <Label htmlFor={textareaId} className={styles.labelText}>
                Content:
              </Label>
              <Textarea
                maxHeight={13}
                id={textareaId}
                {...register("body")}
                placeholder="Enter your post"
                className={styles.contentArea}
              />
            </Form>
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
