// Styles

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
    <div>
      <Link to="/" onClick={onLogout}>log-out</Link>|
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
    </div>
  );
}

function AuthorPosts({ posts, loading }) {
  const published = posts?.filter(post => post.published === true);
  const notPublished = posts?.filter(post => post.published === false);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <div>
        <h2>Posts publicados</h2>
        {posts && published.map(post => 
          <Post 
            key={post.id}
            {...post}
          />
        )}
      </div>
      <div>
        <h2>Posts não publicados</h2>
        {posts && notPublished.map(post => 
          <Post 
            key={post.id}
            {...post}
          />
        )}
      </div>
    </div>
  );
}

function Post(props) {  

  // TODO: delete post
  return (
    <article>
      <h3>{props.title}</h3>
      {props._count.comments > 1 ? <span>{props._count.comments} comentários</span> : <span>{props._count.comments} comentário</span>}
      <p>{prettifyDate(props.createdAt, "fullDate") }</p>
      <Link to={"post/" + props.id} >editar</Link>
    </article>
  );
}