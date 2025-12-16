// Styles

// Custom hook
import usePostData from "../api/usePostData";
// Components
import Form from "../components/Form";
// React | Router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";



// 
function SignUp() {
  const [data, setData] = useState(null);
  const { error, result, isLoading } = usePostData(data, "sign-up");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // TODO: should create another author?
  /* const authorSignup = [
    {
      type: "text",
      name: "firstName",
      className: "",
      value: "",
      minLength: 2,
      maxLength: 32,
      pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
      labelText: "First name: ",
    },
    {
      type: "text",
      name: "lastName",
      className: "",
      value: "",
      minLength: 2,
      maxLength: 32,
      pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
      labelText: "Last name: ",
    }, 
    {
      type: "email",
      name: "email",
      className: "",
      value: "",
      minLength: 2,
      maxLength: 32,
      pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
      labelText: "Last name: ",
    }
  ]; */
  const userSignup = [
    {
      type: "text",
      name: "username",
      className: "",
      value: user.username,
      minLength: 4,
      maxLength: 32,
      pattern: '[a-zA-Z\\d\\-_]{4,32}', // TODO: change length on server-side 
      labelText: "Username: ",
    },
    {
      type: "email",
      name: "email",
      className: "",
      value: user.email,
      minLength: 4,
      // maxLength: '',
      // pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
      // pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      labelText: "E-mail: ",
    },
    {
      type: "password",
      name: "password",
      className: "",
      value: user.password,
      minLength: 6,
      maxLength: 64,
      // pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
      labelText: "Password: ",
    },
    {
      type: "password",
      name: "confirmPassword",
      className: "",
      value: user.confirmPassword,
      minLength: 6,
      maxLength: 64,
      // pattern: '[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ\\s\\-]{2,32}',
      labelText: "Confirm your password: ",
    }
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.status === 200) {
    // Redirect user after successful sign up
    navigate("/log-in");
    }
  },[result, navigate]);

  const handlePost = async (e) => {
    e.preventDefault();

    // const isValid = e.target.checkValidity();
    // TODO: insert validation?
    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());
    // console.log(Object.fromEntries(formJson.entries()));
    setData(formJson);
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    // console.log(e.currentTarget.value);
  };
  
  return (
    <div>
      signup page??
      <Form 
        fields={userSignup} 
        handleSubmit={handlePost} 
        handleChange={handleChange}
        buttonText={"sign up"}
        isError={error}
        message={error?.err}
      />
    </div>
  );
}

export default SignUp;