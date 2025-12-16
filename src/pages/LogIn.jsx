// Styles

// Custom hook
import usePostData from "../api/usePostData";
// Components
import Form from "../components/Form";
// React | Router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";



// 
function LogIn() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { error, result, isLoading } = usePostData(data, "log-in");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = [
    {
      type: "email",
      name: "email",
      className: "",
      value: user.email,
      minLength: 4,
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
  ];

  useEffect(() => {
    if (result?.status === 200 /* && !error */) {
      // console.log(result);
    // Store token on localStorage
    const { token, user } = result;
    console.log(token,localStorage.length);
    // localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("token", token);

    // Redirect user... home
    navigate("/", { replace: true });
    }
  },[result, navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    // console.log('login: ',e.currentTarget.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());
    // console.log(Object.fromEntries(formJson.entries()));
    setData(formJson);
    // TODO: insert validation
  }

  return (
    <div>Login page??
      <Form 
        fields={login}
        handleSubmit={handleLogin}
        handleChange={handleChange}
        buttonText={"log in"}
        isError={error}
        message={error?.err}
      />
    </div>
  );
}

export default LogIn;