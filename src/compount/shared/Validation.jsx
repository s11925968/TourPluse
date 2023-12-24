import * as yup from 'yup';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const registerValidation = yup.object({
  userName: yup.string().required("Username is required").min(3, "Must be greater than 3").max(30, "Must be less than 30"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export const registerValidationForget = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const registerReview = yup.object({
  comment: yup.string().required("Review is required"),
  rating: yup
    .number()
    .required("Review is required")
    .min(1, "Must be greater than or equal to 1")
    .max(5, "Must be less than or equal to 5"),
});
