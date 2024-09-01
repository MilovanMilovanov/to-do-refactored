import { useCallback } from "react";
import { PostModel, updatePost } from "../../../features/user-posts/postsSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Form from "../../molecules/form/Form";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";
import useApi from "../../../hooks/useApi/useApi";
import Button from "../../atoms/button/Button";
import Textarea from "../../atoms/textarea/Textarea";

import styles from "../post/Post.module.scss";
import { PostFormModel } from "../post-list/PostList";

function Post({ id, userId, ...postProps }: PostModel) {
  const { request } = useApi();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm<PostFormModel>({
    values: postProps,
    mode: "onChange",
  });

  const handleCancelChanges = useCallback(
    () => reset(postProps),
    [postProps, reset]
  );

  const onSubmit = () => {
    async function updateUserPost() {
      request({
        method: "PUT",
        endpoint: `posts/${id}`,
        body: JSON.stringify(getValues()),
      });

      dispatch(updatePost({ id, userId, ...getValues() }));
    }
    updateUserPost();
  };

  return (
    <div className={styles.post}>
      <Form
        className={styles.postForm}
        title="Post Form"
        id={String(id)}
        onSubmit={handleSubmit(onSubmit)}
        buttons={
          <div className={styles.btnContainer}>
            <Button
              type="reset"
              className={styles.revertChanges}
              disabled={!isDirty}
              onClick={handleCancelChanges}
            >
              revert changes
            </Button>
            <Button
              type="submit"
              className={styles.submitChanges}
              disabled={!isDirty}
            >
              submit changes
            </Button>
          </div>
        }
      >
        <Label htmlFor={`title-${id}`} className={styles.postLabel}>
          Title:
        </Label>
        <Input
          id={`title-${id}`}
          {...register("title")}
          className={styles.postInput}
          placeholder="Enter your title"
        />

        <Label htmlFor={`body-${id}`} className={styles.postLabel}>
          Content:
        </Label>
        <Textarea
          maxHeight={13}
          id={`body-${id}`}
          {...register("body")}
          className={styles.contentArea}
          placeholder="Enter your post"
        />
      </Form>
    </div>
  );
}

export default Post;
