import { ReactNode, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  updateUser,
  UserModel,
} from "../../../features/user-management/userSlice";
import {
  formFields,
  autocompleteAttributes,
  validationRules,
} from "./constants/userFormConstants";

import ValidationTooltip from "../../molecules/ValidationTooltip/ValidationTooltip";
import Form from "../../molecules/form/Form";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Label from "../../atoms/label/Label";

import styles from "./User.module.scss";

export type UserFormModel = Omit<UserModel, "id">;

interface UserNavigation {
  userNavigation?: ReactNode;
}

function User({
  id,
  userNavigation,
  ...userProps
}: UserModel & UserNavigation) {
  const { id: isSingleUserLoaded } = useParams();
  const {
    handleSubmit,
    reset,
    getValues,
    register,
    formState: { isValid, isDirty, errors },
  } = useForm<UserFormModel>({ values: userProps, mode: "onChange" });
  const dispatch = useDispatch();
  const inputRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCancelChanges = useCallback(
    () => reset(userProps),
    [userProps, reset]
  );

  const onSubmit = () => dispatch(updateUser({ id, ...getValues() }));

  return (
    <div
      className={`${styles.user} ${
        isSingleUserLoaded ? styles["user--adjustUser"] : ""
      }`}
    >
      {userNavigation && (
        <div
          className={`${styles.btnContainerNav} ${
            !isSingleUserLoaded ? styles["btnContainerNav--positionCenter"] : ""
          }`}
        >
          {userNavigation}
        </div>
      )}

      <Form
        id={id}
        title="User Form"
        className={styles.userForm}
        onSubmit={handleSubmit(onSubmit)}
        buttons={
          <div className={styles.btnContainerForm}>
            <Button
              type="reset"
              className={styles.btnRevertChanges}
              disabled={!isDirty}
              onClick={handleCancelChanges}
            >
              revert changes
            </Button>
            <Button
              type="submit"
              className={styles.btnSaveChanges}
              disabled={!isDirty || !isValid}
            >
              save changes
            </Button>
          </div>
        }
      >
        {formFields.map(({ name, label, placeholder }) => {
          const inputId = `${name}-${id}`;
          const errorId = `${name}-error`;
          const hasError = errors[name];

          return (
            <ValidationTooltip
              key={name}
              id={errorId}
              error={hasError}
              portalTarget={inputRefs.current[name]}
            >
              <div
                className={`${styles.inputWrapper}
                ${hasError ? styles["inputWrapper--error"] : ""}`}
                ref={(el) => (inputRefs.current[name] = el)}
              >
                <Input
                  id={inputId}
                  placeholder={placeholder}
                  autoComplete={autocompleteAttributes[name]}
                  aria-describedby={hasError && errorId}
                  className={styles.userInput}
                  {...register(name, validationRules[name])}
                />
                <Label className={styles.userLabel} htmlFor={inputId}>
                  {label}
                </Label>
              </div>
            </ValidationTooltip>
          );
        })}
      </Form>
    </div>
  );
}

export default User;
