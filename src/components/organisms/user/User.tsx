import {
  Fragment,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  updateUser,
  UserModel,
} from "../../../features/user-management/userSlice";
import { formFields, autocompleteAttributes, validationRules } from "./constants/userFormConstants";

import ValidationTooltip from "../../molecules/ValidationTooltip/ValidationTooltip";
import InputErrorIcon from '../../../assets/icons/input-error-icon.svg';
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
  const { handleSubmit, reset, getValues, register, formState: { isDirty, errors, isValid } } = useForm<UserFormModel>({ values: userProps, mode: 'onChange' });
  const dispatch = useDispatch();
  const inputRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCancelChanges = useCallback(() => (
    reset(userProps)
  ), [userProps]);

  const onSubmit = () => {
    isValid && dispatch(updateUser({ id, ...getValues() }));
  };

  return (
    <div
      className={`${styles.user} ${isSingleUserLoaded && styles['user--adjustUser']}`}
    >
      {userNavigation &&
        <div
          className={`${styles.btnContainerNav} ${!isSingleUserLoaded && styles["btnContainerNav--positionCenter"]
            }`}
        >
          {userNavigation}
        </div>
      }

      <Form
        id={id}
        title="User Form"
        className={styles.userForm}
        onSubmit={handleSubmit(onSubmit)}
        buttons={
          <div className={styles.btnContainerForm}>
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

        {formFields.map(({ name, label, placeholder }) => (
          <Fragment key={name}>
            <ValidationTooltip
              id={`${name}-error`}
              error={errors[name]}
              portalTarget={inputRefs.current[name]}
            >
              <Label className={styles.userLabel} htmlFor={`${name}-${id}`}>
                {label}
              </Label>
              <div className={styles.inputWrapper} ref={(el) => inputRefs.current[name] = el}>
              <Input
                id={`${name}-${id}`}
                placeholder={placeholder}
                aria-describedby={errors[name] && `${name}-error`}
                className={`${styles.userInput} ${errors[name] && styles['userInput--error']}`}
                autoComplete={autocompleteAttributes[name]}
                {...register(name, validationRules[name])}
              />
              {errors[name] && <InputErrorIcon role="img" aria-label="error icon" className={styles.errorIcon} fill={'red'} width={'1.3rem'} />}
            </div>
          </ValidationTooltip>
          </Fragment >
      ))
        }
    </Form >
    </div >
  );
}

export default User;
