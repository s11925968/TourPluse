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
export const registerChangePassword= yup.object({
  password:yup.string().required("Password is required"),
  newPassword: yup.string()
    .required("Password is required")
    .matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
export const registerChangeEmail = yup.object({
  newEmail: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'),
});
export const registerCreateTour = yup.object({
  name: yup.string().required("Username is required").min(3, "Must be greater than 3").max(30, "Must be less than 30"),
  location:yup.string().required("Location is required"),
  price:yup.number().required("Price is required"),
  startDate: yup
  .date()
  .required('Start date is required')
  .min(new Date(), 'Start date must be today or later'),
  
  lastRegDate: yup
    .date()
    .required('Last registration date is required')
    .min(new Date(), 'Last registration must be today or later')
    .max(yup.ref('startDate'), 'Last registration date must be before the start date'),

});

export const registerUpdateTour = yup.object({
  startDate: yup
  .date()
  .min(new Date(), 'Start date must be today or later'),
  
  lastRegDate: yup
    .date()
    .min(new Date(), 'Last registration must be today or later')
    .max(yup.ref('startDate'), 'Last registration date must be before the start date'),
});
export const registerCreateOperater = yup.object({
  name: yup.string().required("name is required").min(3, "Must be greater than 3").max(30, "Must be less than 30"),
  address:yup.string().required("address is required"),
  email:yup.string().required("Email is required"),
  password: yup.string()
  .required("Password is required")
  .matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'),
});


export const registerInterests = yup.object({
  interests: yup.array()
    .min(3, 'Please choose at least three interests')
    .max(3, 'Please choose only three interests')
    .of(yup.string().oneOf(["Islamic", "Cultural", "Historical", "Educational", "Adventure", "Relaxation", "Nautical","Camping","Couples","Natural"], 'Invalid interest')),
});
