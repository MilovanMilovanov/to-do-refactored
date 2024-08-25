import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const initialFormData = {
  title: "",
  body: "",
};

function PostList() {
  const { id } = useParams();
  const { request } = useApi();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const [formData, setFormData] =
    useState<Pick<PostModel, "title" | "body">>(initialFormData);

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

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    request({
      method: "POST",
      endpoint: "posts",
      body: JSON.stringify(formData),
    });

    dispatch(addPost({ ...formData, userId: Number(id), id: 0 }));
    setFormData(initialFormData);
    setExpandedItemId(null);
  };

  return (
    <Scrollable isScrollingEnabled={!isPopupOpen}>
      <Popup
        message={`Are you sure you want to delete post with id: ${deleteItemId}?`}
        isOpen={isPopupOpen}
        className={styles.confirmDialog}
        setIsOpen={setIsPopupOpen}
        action={handleDeletePost}
      >
        <section
          className={styles.postList}
        >
          <Accordion
            id={"Add-post-form"}
            title="Add New Post"
            isCollapsed={expandedItemId !== "add-post"}
            toggleElement={() => handleTogglePost("add-post")}
          >
            <Form
              id="Add-post-form"
              title="Add Post"
              className={styles.createPostForm}
              onSubmit={handleSubmit}
              buttons={
                <Button type="submit" className={styles.btnAddPost}>
                  + Add Post
                </Button>
              }
            >
              <Label htmlFor="add-post-title" className={styles.labelText}>Title:</Label>
              <Input
                name="title"
                required={true}
                id="add-post-title"
                value={formData.title}
                placeholder="Enter your title"
                onChange={handleInputChange}
              />
              <Label htmlFor="add-post-body" className={styles.labelText}>Content:</Label>
              <Textarea
                name="body"
                required={true}
                id="add-post-body"
                value={formData.body}
                placeholder="Enter your post"
                className={styles.contentArea}
                onChange={handleInputChange}
              />
            </Form>
          </Accordion>
          {posts?.map((post) => (
            <ul key={post.id} className={styles.postSection}>
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
            </ul>
          ))}
        </section>
      </Popup>
    </Scrollable>
  );
}

export default PostList;
