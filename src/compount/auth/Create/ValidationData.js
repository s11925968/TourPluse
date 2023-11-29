export const validationUserData=(User)=>{
  let errors={};
  if (User.userName.trim()=="")
  {
    errors.userName="username is required";
  }
  else if(User.userName.trim().length<5){
    errors.userName="username must be at least 9 characters";
  }

  if (User.email.trim()=="")
  {
    errors.email="email is required";
  }
  else if(User.email.trim().length<5){
    errors.email="email must be at least 5 characters";
  }

  if (User.password.trim()=="")
  {
    errors.password="password is required";
  }
  else if(User.password.trim().length<5){
    errors.password="password must be at least 5 characters";
  }
  if (User.age.trim()=="")
  {
    errors.password="age is required";
  }
  return errors;
}