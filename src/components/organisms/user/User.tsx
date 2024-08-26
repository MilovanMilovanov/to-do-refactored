import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router";
import {
  updateUser,
  UserModel,
} from "../../../features/user-management/userSlice";

import Form from "../../molecules/form/Form";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Label from "../../atoms/label/Label";

import styles from "./User.module.scss";

interface UserComponentModel extends UserModel {
  className?: string;
  children?: ReactNode;
}

function User({
  id,
  city,
  suite,
  email,
  street,
  username,
  className = "",
}: UserComponentModel) {
  const { id: isUserLoadedFromPosts } = useParams();

  const [formData, setFormData] = useState({
    username,
    email,
    city,
    street,
    suite,
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelChanges = useCallback(() => {
    setFormData({
      username,
      email,
      city,
      street,
      suite,
    });
  }, [username, email, city, street, suite]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser({ id, ...formData }));
  };

  const isFormDataChanged =
    formData.username !== username ||
    formData.email !== email ||
    formData.city !== city ||
    formData.street !== street ||
    formData.suite !== suite;

  return (
    <div
      className={`${styles.user} ${isUserLoadedFromPosts && styles['user--adjustUser']} ${className}`}
    >
      <div
        className={`${styles.btnContainerNav} ${!isUserLoadedFromPosts && styles["btnContainerNav--positionCenter"]
          }`}
      >
        {isUserLoadedFromPosts ? (
          <>
            <span>{username}</span>
            <Link to="/">
              <Button className={styles.userNavnBtn}>Go back</Button>
            </Link>
          </>
        ) : (
          <Link to={`posts/${id}`}>
            <Button className={styles.userNavnBtn} >{`Go to ${username}'s posts`}</Button>
          </Link>
        )}
      </div>

      <Form
        id={id}
        title="User Form"
        className={styles.userForm}
        onSubmit={handleSubmit}
        buttons={
          <div className={styles.btnContainerForm}>
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
        <Label className={styles.userLabel} htmlFor={`username-${id}`}>
          Name:
        </Label>
        <Input
          id={`username-${id}`}
          value={formData.username}
          className={styles.userInput}
          name="username"
          placeholder="Enter Name"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.userLabel} htmlFor={`email-${id}`}>
          Email:
        </Label>
        <Input
          id={`email-${id}`}
          value={formData.email}
          className={styles.userInput}
          name="email"
          placeholder="Enter Email"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.userLabel} htmlFor={`city-${id}`}>
          City:
        </Label>
        <Input
          id={`city-${id}`}
          value={formData.city}
          className={styles.userInput}
          name="city"
          placeholder="Enter City"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.userLabel} htmlFor={`street-${id}`}>
          Street:
        </Label>
        <Input
          id={`street-${id}`}
          value={formData.street}
          className={styles.userInput}
          name="street"
          placeholder="Enter Street"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.userLabel} htmlFor={`suite-${id}`}>
          Suite:
        </Label>
        <Input
          id={`suite-${id}`}
          value={formData.suite}
          className={styles.userInput}
          name="suite"
          placeholder="Enter suite"
          required={true}
          onChange={handleInputChange}
        />
      </Form>
    </div>
  );
}

export default User;
