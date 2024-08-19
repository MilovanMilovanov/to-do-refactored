import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";
import {
  updateUser,
  UserModel,
} from "../../../features/user-management/userSlice";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router";
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
    <li
      className={`${styles.user} ${isUserLoadedFromPosts && styles['user--showBorder']} ${className}`}
    >
      <div
        className={`${styles.btnContainerNavigation} ${
          !isUserLoadedFromPosts && styles["btnContainerNavigation--positionCenter"]
        }`}
      >
        {isUserLoadedFromPosts ? (
          <>
            <span>{username}</span>
            <Link to="/">
              <Button className={styles.userNavigationButton}>Go back</Button>
            </Link>
          </>
        ) : (
          <Link to={`posts/${id}`}>
            <Button className={styles.userNavigationButton} >{`Go to ${username}'s posts`}</Button>
          </Link>
        )}
      </div>

      <Form
        id={id}
        title="User Form"
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
        <Label className={styles.labelText} htmlFor={`username-${id}`}>
          Name:
        </Label>
        <Input
          id={`username-${id}`}
          value={formData.username}
          name="username"
          placeholder="Enter Name"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.labelText} htmlFor={`email-${id}`}>
          Email:
        </Label>
        <Input
          id={`email-${id}`}
          value={formData.email}
          name="email"
          placeholder="Enter Email"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.labelText} htmlFor={`city-${id}`}>
          City:
        </Label>
        <Input
          id={`city-${id}`}
          value={formData.city}
          name="city"
          placeholder="Enter City"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.labelText} htmlFor={`street-${id}`}>
          Street:
        </Label>
        <Input
          id={`street-${id}`}
          value={formData.street}
          name="street"
          placeholder="Enter Street"
          required={true}
          onChange={handleInputChange}
        />

        <Label className={styles.labelText} htmlFor={`suite-${id}`}>
          Suite:
        </Label>
        <Input
          id={`suite-${id}`}
          value={formData.suite}
          name="suite"
          placeholder="Enter suite"
          required={true}
          onChange={handleInputChange}
        />
      </Form>
    </li>
  );
}

export default User;
