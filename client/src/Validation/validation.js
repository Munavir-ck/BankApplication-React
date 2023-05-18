const validate = (values) => {

    console.log(values);
    console.log(!values.name);
    console.log(!values.password);
    const errors = {};
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "password is required";
    }
    if (values.password.length < 6) {
      errors.password = "password must be more than six character";
    }

    console.log(errors);
    return errors;
  };
  export  default  validate