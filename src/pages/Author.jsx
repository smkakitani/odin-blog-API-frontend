// Styles
import styled from "styled-components";
// React
import { useEffect, useState } from "react";
// Router
import { Link, useParams } from "react-router";
// Components
import { Form } from "../components/Form";
import EditPost from "./EditPost";
import CreatePost from "./CreatePost";
// Custom hook
import { useAuth } from "../utils/AuthContext";
import { prettifyDate } from "../utils/lib";
import useGetData from "../api/useGetData";
import usePutData from "../api/usePutData";



// 
const DivStyle = styled.div`
  display: flex;
  flex-direction: column;

  & span.author {
    color: #ff3985;
  }
  & a {
    color: blueviolet;
    text-decoration: underline;
  }
`;
export default function Author() {
  const { onLogout, user, token } = useAuth();
  const endpoint = `posts/${user?.id}`;
  const { error, loading, data } = useGetData(endpoint, token);
  const { data: authorData } = useGetData(`authors/${user?.id}`, token);
  // 
  const { editPostId, createPost } = useParams();

  useEffect(() => {
    if ((user?.type !== "author") || (error?.status === 401)) {
      onLogout();
    }
  });

  return (
    <DivStyle>
      <h2>Olá, <span className="author">{user?.username || "unknown"}</span>!</h2>
      <Link to="/" onClick={onLogout}>log-out</Link>
      {!createPost && (authorData && <EditAuthor 
        authorData={authorData}
        user={user}
        token={token}
      />)}

      {!createPost && <Link to="post" >criar post</Link>}

      {(data && editPostId) ? (
        <EditPost
          posts={data} 
          postId={editPostId}
          user={user}
          token={token}
          onLogout={onLogout}
        />
      ) : createPost ? (
        <CreatePost />
      ) : (
        <AuthorPosts
          posts={data} 
          loading={loading}
        />
      )}
    </DivStyle>
  );
}

const DivEdit = styled.div`

`;
const FormEdit = styled(Form)`
  & label {
    display: flex;
    flex-direction: column;

    width: 90%;
  }
`;
const TextareaStyle = styled.textarea`
  display: block;
  overflow: auto;

  /* background-color: rgba(60, 5, 111, 0.8); */
  background: none;

  width: 100%;
  height: 15em;
  resize: vertical;

  padding: 0.25rem 0.5rem;

  border: 2px solid rgb(58, 12, 102);
  border-radius: 3px;
`;
const SpanBio = styled.span`
  white-space: pre-wrap;
`;
function EditAuthor({ authorData, user, token }) {  
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(authorData?.bio);
  const [newData, setNewData] = useState(null);
  const endpoint = `authors/${user.id}`;
  const { error } = usePutData(newData, endpoint, token);
  
  const handleSubmit = async (e) => {
    // e.preventDefault();

    setIsEditing(!isEditing);

    if (error) {
      setNewBio(authorData?.bio);
    }    

    if (isEditing) {
      if (authorData.bio === newBio) {
        e.preventDefault();
        return;
      }

      const form = new FormData(e.target);
      const formJson = Object.fromEntries(form.entries());
      console.log(formJson);

      setNewData(formJson);
      return;
    }

    e.preventDefault();
  };

  const handleNewBio = (e) => {
    setNewBio(e.target.value);
  };

  return (
    <DivEdit>
      <FormEdit 
        handleSubmit={handleSubmit}
        buttonText={isEditing ? "salvar" : "editar"}
      >
        <label>sobre mim:{" "}
          {isEditing ? (
            <TextareaStyle 
              name="bio" 
              id="bio"
              value={newBio}
              onChange={handleNewBio}
            ></TextareaStyle>
          ) : (
            <SpanBio>{authorData?.bio}</SpanBio>
          )}
        </label>
      </FormEdit>
    </DivEdit>
  );
}

const DivPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2em;

  padding-top: 1em;

  & div.publishedPosts,
  div.unpublishedPosts {
    display: flex;
    flex-direction: column;
    gap: 1em;

    padding: 0 1em;

    background-color: rgba(60, 5, 111, 0.8);
    border: 2px solid rgb(58, 12, 102);
  }
`;
function AuthorPosts({ posts, loading }) {
  const published = posts?.filter(post => post.published === true);
  const notPublished = posts?.filter(post => post.published === false);

  if (loading) return <p>Loading posts...</p>;

  return (
    <DivPosts>
      <div className="publishedPosts">
        <h2>Posts publicados</h2>
        {posts && published.map(post => 
          <Post 
            key={post.id}
            {...post}
          />
        )}
      </div>
      <div className="unpublishedPosts">
        <h2>Posts não publicados</h2>
        {posts && notPublished.map(post => 
          <Post 
            key={post.id}
            {...post}
          />
        )}
      </div>
    </DivPosts>
  );
}

const ArticlePost = styled.article`
  border-top: 3px ridge rgb(58, 12, 102);

  padding-top: 0.5em;

  & h3 {
    color: #ff3985;
  }
`;
function Post(props) {  

  // TODO: delete post
  return (
    <ArticlePost>
      <h3>{props.title}</h3>
      {props._count.comments > 1 ? <p>{props._count.comments} comentários</p> : <p>{props._count.comments} comentário</p>}
      <p>criado em: {prettifyDate(props.createdAt, "fullDate")}</p>
      <Link to={"post/" + props.id} >editar</Link>
    </ArticlePost>
  );
}