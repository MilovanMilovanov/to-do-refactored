import { useCallback } from "react";
import {
  addPost,
  PostModel,
  updatePost,
} from "../../../features/user-posts/postsSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Form from "../../molecules/form/Form";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";
import useApi from "../../../hooks/useApi/useApi";
import Button from "../../atoms/button/Button";
import Textarea from "../../atoms/textarea/Textarea";

import styles from "../post/Post.module.scss";

type PostFormModel = Pick<PostModel, "title" | "body">;

interface PostModelExtended extends Partial<PostModel> {
  isAddPost?: boolean;
}

const initialCreatePostFormData: PostFormModel = {
  title: "",
  body: "",
};

export const addPostFormId = "Add-post-form";
const titleInputId = "add-post-title";
const textareaId = "add-post-body";

function Post({ isAddPost, id, userId, ...postProps }: PostModelExtended) {
  const { request } = useApi();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { isDirty, isValid },
  } = useForm<PostFormModel | Partial<PostModel>>(
    isAddPost
      ? {
          defaultValues: initialCreatePostFormData,
          mode: "onChange",
        }
      : {
          values: postProps,
          mode: "onChange",
        }
  );

  const handleCancelChanges = useCallback(
    () => reset(postProps),
    [postProps, reset]
  );

  const onSubmit = () => {
    if (isAddPost) {
      request({
        method: "POST",
        endpoint: "posts",
        body: JSON.stringify(getValues()),
      });

      const newPost = { ...getValues(), userId, id: -1 } as PostModel;

      dispatch(addPost(newPost));
      reset(initialCreatePostFormData);
    } else {
      request({
        method: "PUT",
        endpoint: `posts/${id}`,
        body: JSON.stringify(getValues()),
      });

      const updatedPost = { ...getValues(), userId, id } as PostModel;

      dispatch(updatePost(updatedPost));
    }
  };

  const formProps = {
    id: isAddPost ? addPostFormId : String(id),
    title: isAddPost ? "Add Post" : "Post Form",
    className: `${styles.postForm}  ${
      isAddPost ? styles["postForm--addPost"] : ""
    }`,
    onSubmit: handleSubmit(onSubmit),
    buttons: (
      <div
        className={`${styles.btnContainer} ${
          isAddPost ? styles["btnContainer--singleBtn"] : ""
        }`}
      >
        {isAddPost ? (
          <Button
            type="submit"
            className={styles.btnAddPost}
            aria-label="Add Post"
            disabled={!isValid}
          >
            + Add Post
          </Button>
        ) : (
          <>
            <Button
              type="reset"
              className={styles.revertChanges}
              disabled={!isDirty}
              aria-label="Revert Changes"
              onClick={handleCancelChanges}
            >
              Revert
            </Button>
            <Button
              type="submit"
              disabled={!isDirty}
              aria-label="Save Changes"
              className={styles.submitChanges}
            >
              Save
            </Button>
          </>
        )}
      </div>
    ),
  };

  return (
    <div className={styles.post}>
      <Form {...formProps}>
        {isAddPost ? (
          <>
            <Label htmlFor={titleInputId} className={styles.postLabel}>
              Title:
            </Label>
            <Input
              id={titleInputId}
              {...register("title", { required: true })}
              placeholder="Enter your title"
              className={styles.postTitle}
            />
            <Label htmlFor={textareaId} className={styles.postLabel}>
              Content:
            </Label>
            <Textarea
              maxHeight={13}
              id={textareaId}
              {...register("body", { required: true })}
              placeholder="Enter your post"
              className={styles.postContent}
            />
          </>
        ) : (
          <>
            <Label htmlFor={`title-${id}`} className={styles.postLabel}>
              Title:
            </Label>
            <Input
              id={`title-${id}`}
              {...register("title")}
              className={styles.postTitle}
              placeholder="Enter your title"
            />

            <Label htmlFor={`body-${id}`} className={styles.postLabel}>
              Content:
            </Label>
            <Textarea
              maxHeight={13}
              id={`body-${id}`}
              {...register("body")}
              className={styles.postContent}
              placeholder="Enter your post"
            />
          </>
        )}
      </Form>
    </div>
  );
}

export default Post;
