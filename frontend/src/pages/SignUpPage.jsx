import React from "react";
import { useState } from "react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  return <div>SignUpPage</div>;
};

export default SignUpPage;
