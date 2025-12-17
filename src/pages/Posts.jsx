// Styles

// Custom Hook
import useGetData from "../api/useGetData";
// Components

// React | Router
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
// utils
import { prettifyDate } from "../utils/lib";



// 
function Posts() {
  const [endpoint, setEndpoint] = useState("posts");
  const { error, loading, data } = useGetData(endpoint);
  // const [post, setPost] = useState(null);

  const { postId } = useParams(); // if no postId is set, it returns undefined
  // post return the most recent post if there's no postId
  let post;

  // Set most recent post as default
  if (!postId && data) {
    // console.log('data is array?',Array.isArray(data), data);
    // Get lastest post
    const lastPost = data.reduce((maxDate, currDate) => {
      return (new Date(currDate.createdAt) > new Date(maxDate.createdAt)) ? currDate : maxDate;
    }, data[0]);
    // console.log(lastPost);
    post = lastPost;
  }

  if (data && postId) {
    post = data.find((post) => post.id === parseInt(postId));
  }
  // console.log('post is array?',Array.isArray(post), post);

  // useEffect(() => {
  //   // sync postId with data?
  //   if (data) {
  //     setPost(data.filter((post) => post.id === parseInt(postId)));
  //     // const post = data.filter((post) => post.id === parseInt(postId));
  //   }
  // }, [data, postId]);  

  return (
    <div>
      posts =D
      {data && <PostsPreview posts={data}/>}
      {(data && post) && <DisplayPost 
        key={post.id}
        post={post}      
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

function DisplayPost({ post }) {
  const { error, loading, data } = useGetData(`posts/${post.id}/comments`);
  const comments = data?.comments;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>huh oh x_x</p>

  // console.dir(comments);
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{prettifyDate(post.createdAt)}</p>
      <div>{post.content}</div>
      <hr />
      {(data && (comments.length === 0)) && <p>No comments yet ;-;</p>}
      {(data && comments) && comments.map((comment) => (
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

export default Posts;