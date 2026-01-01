// Styles

// React
import { useEffect, useState } from "react";
// Router
import { Link } from "react-router";
// Components
import { Form } from "../components/Form";
import Button from "../components/Button";
// Custom hook | utils
import { useAuth } from "../utils/AuthContext";
import { prettifyDate } from "../utils/lib";
import useGetData from "../api/useGetData";
import usePutData from "../api/usePutData";
import useDelData from "../api/useDelData";



// 
export default function User() {
  const { onLogout, user, token } = useAuth();
  const endpoint = `visitors/${user?.username}`;
  const { error, loading, data, refetchData } = useGetData(endpoint, token);
  const { error: delError, result, delData } = useDelData();
  
  useEffect(() => {
    if (error?.status === 401 || delError?.status === 401) {
      onLogout();
    }
  }, [error, delError, onLogout]);

  useEffect(() => {
    if (result && delError === null) {
      refetchData();
    } else {
      console.log("tried to refetch user's comments but FAILED!!! ):");
    }
  }, [result, delError, refetchData]);

  const handleDeleteComment = async (commentId, postId) => {
    const path = `posts/${postId}/comments/${commentId}`
    await delData(path, token);
  };

  return (
    <div>Olá, {user?.username || "unknown"} 
      <Link to="/" onClick={onLogout}>log-out</Link>
      {loading && <p>loading your data...</p>}
      {data && <EditUser 
        userEmail={data?.email}
        token={token}
        endpoint={endpoint}  
      />}
      {data && <UserComment 
        comments={data.comments}
        // comments={displayComments}
        handleDeleteComment={handleDeleteComment}
      />}
    </div>
  );
}

function UserComment({ comments, handleDeleteComment }) {

  return (
    <div>Seus comentários:
      {comments.map(comment => 
        <article key={comment.id}>
          <Button 
            type="button"
            text={"deletar"}
            handleClick={() => handleDeleteComment(comment.id, comment.postId)}
          />
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