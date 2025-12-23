// Styles

// React
import { useEffect, useState } from "react";
// Router
import { Link, useNavigate } from "react-router";
// Components
import { Field, Form } from "../components/Form";
// Custom hook
import { useAuth } from "../utils/AuthContext";
import useGetData from "../api/useGetData";
import usePostData from "../api/usePostData";
import usePutData from "../api/usePutData";
import { prettifyDate } from "../utils/lib";



// 
export default function User() {
  const { onLogout, user, token } = useAuth();
  const navigate = useNavigate();
  const endpoint = `visitors/${user}`;
  const { error, loading, data } = useGetData(endpoint, token);
  
  if (error) {
    console.log(error.status);
    if (error.status === 401) {
      onLogout();
      console.log("logging out...");

      // Redirect user
      navigate("/log-in");
    }
  }

  return (
    <div>Olá, {user} 
      <Link to="/" onClick={onLogout}>log-out</Link>
      {loading && <p>loading your data...</p>}
      {data && <EditUser 
        userEmail={data?.email}
        token={token}
        endpoint={endpoint}  
      />}
      <UserComment />
    </div>
  );
}

function UserComment() {
  const { user, token } = useAuth();
  const { error, loading, data } = useGetData(`visitors/${user}`, token);

  let comments;

  if (data) {
    comments = data.comments;
    // console.log(comments);
  }

  return (
    <div>Seus comentários:
      {data && comments.map(comment => 
        <article key={comment.id}>
          <p>{prettifyDate(comment.createdAt, "fullDate")}</p>
          <p>{comment.content}</p>
          <p>Post: </p>
          <Link to={"/posts/" + comment.post.id}>{comment.post.title}</Link>
        </article>
      )}
    </div>
  );
}

function EditUser({ userEmail, token, endpoint }) {
  const [data, setData] = useState(null);
  const { error, isLoading, result } = usePutData(data, endpoint, token);
  const [isEditing, setIsEditing] = useState(false);
  const [userValue, setUserValue] = useState({
    email: userEmail,
  });

  const handleChange = (e) => {
    setUserValue({
      ...userValue,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);

    if (error) {
      setUserValue({
        ...userValue,
        email: userEmail,
      });
    }

    // TODO: insert frontend validation, then send to server
    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());

    if (userEmail === userValue.email) {
      return;
    }

    if (isEditing) {
      setData(formJson);
    }
  };

  if (error) {
    console.log(error);
  }

  if (result) {
    console.log(result);
  }

  return (
    <div>
      <Form 
        handleSubmit={handleSubmit}
        buttonText={isEditing ? "salvar" : "editar"}
        isError={error}
        message={error?.err}
        isDisabled={isLoading}
      >
        <label>e-mail:{" "}
          {isEditing ? (
            <input 
              onChange={handleChange}
              type="email"
              name="email"
              value={userValue.email}
              minLength={4}
              maxLength={254} />
          ) : (
            <span>{userEmail}</span>
          )}
        </label>       
      </Form>
    </div>
  );
}