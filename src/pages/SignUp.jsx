// Styles

// Custom hook
import usePostData from "../api/usePostData";
// Components
import { Form, Field } from "../components/Form";
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
  // TODO: should be able to create another author?
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
      pattern: '[a-zA-Z\\d\\-_]{4,32}',
      labelText: "Username: ",
    },
    {
      type: "email",
      name: "email",
      className: "",
      value: user.email,
      minLength: 4,
      maxLength: 254,
      labelText: "E-mail: ",
    },
    {
      type: "password",
      name: "password",
      className: "",
      value: user.password,
      minLength: 6,
      maxLength: 64,
      labelText: "Password: ",
    },
    {
      type: "password",
      name: "confirmPassword",
      className: "",
      value: user.confirmPassword,
      minLength: 6,
      maxLength: 64,
      labelText: "Confirm your password: ",
    }
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.status === 201) {
    // Redirect user after successful sign up    
    navigate("/log-in");
    }
  },[result, navigate]);

  const handlePost = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());

    setData(formJson);
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  
  return (
    <div>
      <h2>Sign up!</h2>
      <Form 
        handleSubmit={handlePost}
        buttonText={"sign up"}
        isError={error}
        message={error?.err}
      >
        {userSignup.map((item) => 
          <Field key={item.name}
            {...item}
            onChange={handleChange}
            className={error?.err.some((error) => error.path === item.name) ? "invalid" : ""}
          />
        )}
      </Form>
    </div>
  );
}

export default SignUp;