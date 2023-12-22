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

export const registerReivew = yup.object({
  rating: yup.string().required("rivew is required").min(1, "Must be greater than 1").max(5, "Must be less than 5"),
});