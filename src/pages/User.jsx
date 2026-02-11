// Styles
import styled from "styled-components";
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
const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & span.user {
    color: #ff3985;
  }
  & a {
    color: blueviolet;
    text-decoration: underline;
  }
`;
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
    // User can cancel deleting their comment
    if (window.confirm("Deletar este comentário?")) {
      const path = `posts/${postId}/comments/${commentId}`
      await delData(path, token);
    }    
  };

  return (
    <DivStyle>
      <div>
        <h2>Olá, <span className="user">{user?.username || "unknown"}</span>!</h2>
        <Link to="/" onClick={onLogout}>log-out</Link>
      </div>
      {loading && <p>loading your data...</p>}
      {data && <EditUser 
        userEmail={data?.email}
        token={token}
        endpoint={endpoint}  
      />}
      {data && <UserComment 
        comments={data.comments}
        username={data.username}
        // comments={displayComments}
        handleDeleteComment={handleDeleteComment}
      />}
    </DivStyle>
  );
}

const DivComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  /* align-items: center; */

  background-color: rgba(60, 5, 111, 0.8);

  & h3 {
    padding-top: 1rem;
  }
`;
const ArticleStyle = styled.article`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr minmax(max-content, 2fr);
  column-gap: 1em;
  justify-items: start;

  border-top: 3px ridge rgb(58, 12, 102);

  padding-top: 0.5em;

  .post {
    grid-column: 2;
    grid-row: 1;
  }
  .user {
    grid-column: 2;
    grid-row: 2;

    font-size: 0.9rem;
  }
  .userComment {
    grid-column: 2;
    grid-row: 3;
  }
  button {
    grid-column: 1;
    grid-row: 1 / -1;
    place-self: center;
  }
`;
function UserComment({ username, comments, handleDeleteComment }) {
  return (
    <DivComments>
      <h3>Seus comentários:</h3>
      {comments.map(comment => 
        <ArticleStyle key={comment.id}>
          <Button 
            type="button"
            text={"✖ deletar"}
            handleClick={() => handleDeleteComment(comment.id, comment.postId)}
          />
          <p className="post"><Link to={"/posts/" + comment.post.id}>{comment.post.title}</Link></p>
          <p className="user">{username}  &#128921;  {prettifyDate(comment.createdAt, "date")}</p>
          <p className="userComment">{comment.content}</p>
        </ArticleStyle>
      )}
    </DivComments>
  );
}

const FormEdit = styled(Form)`
  flex-direction: row;
  justify-content: center;

  & button {
    margin-top: 0;
  }
`;
const InputStyle = styled.input`
  border: 1px inset #8a2be2;

  margin-left: 0.5rem;

  &:focus {
    box-shadow: 0px 0px 13px 3px #8a2be2;
  }
  &:focus-visible {
    outline: 1px inset #8a2be2;
  }
  &.invalid {
    border-color: red;
  }
`;
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
      <FormEdit 
        handleSubmit={handleSubmit}
        buttonText={isEditing ? "salvar" : "editar"}
        isError={error}
        message={error?.err}
        isDisabled={isLoading}
      >
        <label>e-mail:{" "}
          {isEditing ? (
            <InputStyle 
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
      </FormEdit>
    </div>
  );
}