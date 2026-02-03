// Styles

// Custom hook
import usePostData from "../api/usePostData";
import { useAuth } from "../utils/AuthContext";
// Components
import { Form, Field } from "../components/Form";
// React | Router
import { useEffect, useState } from "react";



// 
function LogIn() {
  const [data, setData] = useState(null);
  const { error, result, isLoading } = usePostData(data, "log-in");
  const { onLogin } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const userLogin = [
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
    if (result?.status === 200) {
      const { token, user } = result;
      const credencials = { user, token };
      
      // Send data to auth context
      onLogin(credencials); 
    }

  },[result, onLogin]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());
    
    setData(formJson);    
  }

  return (
    <div>
      <h2>Log in</h2>
      <Form
        handleSubmit={handleLogin}
        buttonText={"log in"}
        isError={error}
        message={error?.err}
      >
        {userLogin.map((item) => 
          <Field key={item.name}
            {...item}
            onChange={handleChange}
            className={error ? "invalid" : ""}
          />
        )}
      </Form>
    </div>
  );
}

export default LogIn;