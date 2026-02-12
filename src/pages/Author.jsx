// Styles
import styled from "styled-components";
// React
import { useEffect } from "react";
// Router
import { Link, useParams } from "react-router";
// Components
import EditPost from "./EditPost";
import CreatePost from "./CreatePost";
// Custom hook
import { useAuth } from "../utils/AuthContext";
import useGetData from "../api/useGetData";
import { prettifyDate } from "../utils/lib";



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
  const { error, loading, data } = useGetData(`posts/${user?.id}`, token);
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
      {!createPost && <Link to="post" >criar post</Link>}

      {(data && editPostId) ? (
        <EditPost
          posts={data} 
          postId={editPostId}
          user={user}
          token={token}
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

const DivPosts = styled.div`
  display: flex;
  justify-content: space-around;

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
      <p>{prettifyDate(props.createdAt, "fullDate")}</p>
      <Link to={"post/" + props.id} >editar</Link>
    </ArticlePost>
  );
}