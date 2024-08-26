import { ChangeEvent, FormEvent, useState } from "react";
import { PostModel, updatePost } from "../../../features/user-posts/postsSlice";
import { useDispatch } from "react-redux";

import Form from "../../molecules/form/Form";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";
import useApi from "../../../hooks/useApi/useApi";
import Button from "../../atoms/button/Button";
import Textarea from "../../atoms/textarea/Textarea";

import styles from "../post/Post.module.scss";

function Post(props: PostModel) {
  const { request } = useApi();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<PostModel>(props);

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelChanges = () => setFormData(props);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function updateUserPost() {
      request({
        method: "PUT",
        endpoint: `posts/${props.id}`,
        body: JSON.stringify(formData),
      });

      dispatch(updatePost(formData));
    }

    updateUserPost();
  };

  const isFormDataChanged =
    formData.title !== props.title || formData.body !== props.body;

  return (
    <div className={styles.post}>
      <Form
      className={styles.postForm}
        title="Post Form"
        id={String(props.id)}
        onSubmit={handleSubmit}
        buttons={
          <div className={styles.btnContainer}>
            <Button
              type="reset"
              className={styles.revertChanges}
              disabled={!isFormDataChanged}
              onClick={handleCancelChanges}
            >
              revert changes
            </Button>
            <Button
              type="submit"
              className={styles.submitChanges}
              disabled={!isFormDataChanged}
            >
              submit changes
            </Button>
          </div>
        }
      >
        <Label htmlFor={`title-${formData.title}`} className={styles.postLabel}>Title:</Label>
        <Input
          id={`${`title-${formData.title}`}`}
          value={formData.title}
          name="title"
          className={styles.postInput}
          placeholder="Enter your title"
          onChange={handleInputChange}
        />

        <Label htmlFor={`body-${formData.body}`} className={styles.postLabel}>Content:</Label>
        <Textarea
          className={styles.contentArea}
          id={`body-${formData.body}`}
          value={formData.body}
          maxHeight={13}
          name="body"
          placeholder="Enter your post"
          onChange={handleInputChange}
        />
      </Form>
    </div>
  );
}

export default Post;
