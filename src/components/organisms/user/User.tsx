import {
  ChangeEvent,
  FormEvent,
  Fragment,
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

interface FormFieldModel {
  name: string;
  label: string;
  placeholder: string;
}

const formFields: FormFieldModel[] = [
  { name: 'username', label: 'Name:', placeholder: 'Enter Name' },
  { name: 'email', label: 'Email:', placeholder: 'Enter Email' },
  { name: 'city', label: 'City:', placeholder: 'Enter City' },
  { name: 'street', label: 'Street:', placeholder: 'Enter Street' },
  { name: 'suite', label: 'Suite:', placeholder: 'Enter Suite' },
];


const haveObjectChanged = <T extends Record<string, any>>(obj1: T, obj2: T): boolean => (
  Object.keys(obj1).some(key => obj1[key] !== obj2[key])
);

function User({
  id,
  ...userProps
}: UserModel) {
  const { id: isUserLoadedFromPosts } = useParams();

  const [formData, setFormData] = useState(userProps);

  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelChanges = useCallback(() => (
    setFormData(userProps)
  ), [userProps]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser({ id, ...formData }));
  };

  const hasFormChanged = haveObjectChanged(formData, userProps);

  return (
    <div
      className={`${styles.user} ${isUserLoadedFromPosts && styles['user--adjustUser']}`}
    >
      <div
        className={`${styles.btnContainerNav} ${!isUserLoadedFromPosts && styles["btnContainerNav--positionCenter"]
          }`}
      >
        {isUserLoadedFromPosts ? (
          <>
            <span>{userProps.username}</span>
            <Link to="/">
              <Button className={styles.userNavnBtn}>Go back</Button>
            </Link>
          </>
        ) : (
          <Link to={`posts/${id}`}>
            <Button className={styles.userNavnBtn} >{`Go to ${userProps.username}'s posts`}</Button>
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
              disabled={!hasFormChanged}
              onClick={handleCancelChanges}
            >
              revert changes
            </Button>
            <Button
              type="submit"
              className={styles.submitChanges}
              disabled={!hasFormChanged}
            >
              submit changes
            </Button>
          </div>
        }
      >

        {formFields.map(({ name, label, placeholder }) => (
          <Fragment key={name}>
            <Label className={styles.userLabel} htmlFor={`${name}-${id}`}>
              {label}
            </Label>
            <Input
              id={`${name}-${id}`}
              value={formData[name as keyof typeof formData]}
              className={styles.userInput}
              name={name}
              placeholder={placeholder}
              required
              onChange={handleInputChange}
            />
          </Fragment>
        ))}
      </Form>
    </div>
  );
}

export default User;
