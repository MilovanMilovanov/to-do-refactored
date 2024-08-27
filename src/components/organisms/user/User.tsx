import {
  FormEvent,
  Fragment,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router";
import { areObjectValuesDifferent } from "../../../utils/utils";
import {
  updateUser,
  UserModel,
} from "../../../features/user-management/userSlice";
import useForm from "../../../hooks/useApi/useForm/useForm";

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

function User({
  id,
  ...userProps
}: UserModel) {
  const { id: isUserLoadedFromPosts } = useParams();
  const { formData, resetForm, handleInputChange } = useForm<Omit<UserModel, "id">>(userProps);

  const dispatch = useDispatch();

  const handleCancelChanges = useCallback(() => (
    resetForm(userProps)
  ), [userProps]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser({ id, ...formData }));
  };

  const hasFormChanged = areObjectValuesDifferent(formData, userProps);

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
