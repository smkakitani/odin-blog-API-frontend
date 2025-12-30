// Styles

// Custom Hook | utils
import useGetData from "../api/useGetData";
import { prettifyDate } from "../utils/lib";
import { useAuth } from "../utils/AuthContext";
import usePostData from "../api/usePostData";
// Components
import Button from "../components/Button";
import RenderHtml from "../components/RenderHtml";
// React | Router
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";



// 
function Posts() {
  const { user, token, onLogout } = useAuth();
  const { error, loading, data } = useGetData("posts");
  const { postId } = useParams();
  // Local mutation
  let post = {};

  // Set most recent post as default
  if (!postId && data) {
    // Get lastest post to be displayed as default
    const lastPost = data.reduce((maxDate, currDate) => {
      return (new Date(currDate.createdAt) > new Date(maxDate.createdAt)) ? currDate : maxDate;
    }, data[0]);

    post = lastPost;
  }

  if (data && postId) {
    post = data.find((post) => post.id === parseInt(postId));
  }

  return (
    <div>
      <h2>posts</h2>
      {data && <PostsPreview posts={data}/>}
      {(data && post) && <DisplayPost 
        key={post.id}
        post={post}
        user={user}
        token={token}
        onLogout={onLogout}
      />}
    </div>
  );
}

function PostsPreview({ posts }) {
  // Sidebar to display posts
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside>
      {<ul>
        <li>
          <button onClick={handleToggle}>2025</button>
          <ul>
            {isOpen && posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>}
    </aside>
  );
}

function DisplayPost({ post, user, token, onLogout }) {
  const { error, loading, data } = useGetData(`posts/${post.id}/comments`);
  const [userComment, setUserComment] = useState(null);
  const { error: postError, result, isLoading } = usePostData(userComment, `posts/${post.id}/comments`, token);
  const [commentList, setCommentList] = useState([]);

  // Get triggered when user tries to send comment on post 
  useEffect(() => {
    if (postError?.status === 401) {
      alert(postError.message.name);
      onLogout();
    }
  }, [onLogout, postError]);

  useEffect(() => {
    if (data) {
      setCommentList(() => data.comments);
    }
  }, [data]);

  useEffect(() => {
    if (result) {
      setCommentList(cl => [...cl, result]);
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());
    
    // console.log(formJson);
    setUserComment(formJson);
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{prettifyDate(post.createdAt, "fullDate")}</p>
      <RenderHtml display={post.content}/>
      <p>{post.author.firstName + " " + post.author.lastName}</p>
      <hr />
      {/* TODO: comments count to be up to date */}
      {(data && (commentList?.length === 0)) ? <p>sem comentários</p> : <p>commentários({post._count.comments})</p>}

      {/* Field for user to comment */}
      {(user?.type === "user") && <CreateComment 
        token={token}
        handleSubmit={handleSubmit}
      />}
      {isLoading && <p>loadings com</p>}
      {(data && commentList) && commentList.map((comment) => (
        <DisplayComment 
          {...comment}
          key={comment.id}        
        />
      ))}
    
    </div>
  );
}

function DisplayComment(comment) {
  return (
    <section>
      <div>{comment.username.username} | {prettifyDate(comment.createdAt)}</div>
      <p>{comment.content}</p>
    </section>
  );
}

function CreateComment({ token, handleSubmit }) {
  // TODO: after submit, reset <textarea>!
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  return (
    <div>
      Postar um comentário
      <form onSubmit={handleSubmit}>
        <label>
          <textarea 
            cols={50}
            rows={10}
            name="content" 
            id="newComment"
            value={comment}
            disabled={!token}
            onChange={handleChange}></textarea>
        </label>
        <Button 
          type={"submit"} 
          isDisabled={comment.length === 0}
          text={"comentar"}
        />
      </form>
      <p>{comment.length} caractere{comment.length >= 2 ? "s" : ""}</p>
    </div>
  );
}

export default Posts;