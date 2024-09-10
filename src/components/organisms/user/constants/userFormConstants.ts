import { RegisterOptions } from "react-hook-form";
import { UserFormModel } from "../User";

interface FormFieldModel {
  name: keyof UserFormModel;
  label: string;
  placeholder: string;
}

export const validationRules: Record<
  keyof UserFormModel,
  RegisterOptions<UserFormModel>
> = {
  username: {
    required: "Username is required",
    minLength: {
      value: 2,
      message: "Username must be at least 3 characters",
    },
    maxLength: {
      value: 20,
      message: "Username must be no more than 20 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email is not valid",
    },
    maxLength: {
      value: 30,
      message: "Email must be no more than 30 characters",
    },
  },
  city: {
    required: "City is required",
    minLength: { value: 3, message: "City must be at least 3 characters" },
    maxLength: {
      value: 30,
      message: "City must be no more than 50 characters",
    },
  },
  street: {
    required: "Street is required",
    maxLength: {
      value: 20,
      message: "Street must be no more than 100 characters",
    },
  },
  suite: {
    required: "Suite is required",
    minLength: { value: 3, message: "Suite must be at least 3 characters" },
    maxLength: {
      value: 10,
      message: "Suite must be less than 20 characters",
    },
  },
};

export const formFields: FormFieldModel[] = [
  { name: "username", label: "Name", placeholder: "Enter Name" },
  { name: "email", label: "Email", placeholder: "Enter Email" },
  { name: "city", label: "City", placeholder: "Enter City" },
  { name: "street", label: "Street", placeholder: "Enter Street" },
  { name: "suite", label: "Suite", placeholder: "Enter Suite" },
];

export const autocompleteAttributes: Record<keyof UserFormModel, string> = {
  username: "username",
  email: "email",
  city: "address-level2",
  street: "address-line1",
  suite: "address-line2",
};
