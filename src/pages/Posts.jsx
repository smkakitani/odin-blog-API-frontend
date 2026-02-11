// Styles
import styled from "styled-components";
// Custom Hook | utils
import useGetData from "../api/useGetData";
import usePostData from "../api/usePostData";
import useDelData from "../api/useDelData";
import { prettifyDate } from "../utils/lib";
import { useAuth } from "../utils/AuthContext";
// Components
import Button from "../components/Button";
import RenderHtml from "../components/RenderHtml";
// Lucide icons
import { ChevronRight, ChevronDown } from 'lucide-react';
// React | Router
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";



// 
const Grid = styled.div`
  display: grid;
  grid-template-columns: max-content 3fr;
  grid-template-rows: max-content 1fr;
  grid-column-gap: 1rem;
`;

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
    <Grid id="posts">
      {/* <h2>posts</h2> */}
      {data && <PostsPreview posts={data}/>}
      {(data && post) && <DisplayPost 
        key={post.id}
        post={post}
        user={user}
        token={token}
        onLogout={onLogout}
      />}
    </Grid>
  );
}

const svgSize = "20px";
const Aside = styled.aside`
  width: 125px;

  grid-column: 1;

  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);
  
  & button {
    cursor: pointer;
    display: flex;
    align-items: center;

    font-size: 1.25rem;

    color: #ff3985;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid transparent;

    transition: border-color 0.25s;
  }
  & button > span {
    display: flex;
  }
  & .lucide {
    width: ${svgSize};
    height: ${svgSize};
    stroke-width: 3px;
  }
  & ul {
    list-style: none;
  }
  & > ul > li {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  & > ul > li > ul {
    font-size: small;
    text-align: start;
    padding-left: 20px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  & svg {
    display: inline;
    max-width: 100%;
  }
`;

function PostsPreview({ posts }) {
  // TODO: fix years 
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Aside>
      <p>~ posts ~</p>
      {<ul>
        <li>
          <button onClick={handleToggle}>
            <span>{isOpen ? <ChevronDown /> : <ChevronRight />}</span>2025
          </button>
          <ul>
            {isOpen && posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>}
    </Aside>
  );
}

const ArticlePost = styled.article`
  display: grid;
  grid-template-rows: max-content 1fr 4fr 1fr;

  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);

  & > h3 {
    font-size: 1.7rem;
  }
  & > p.date {
    font-style: italic;
  }
`;
const ArticleComment = styled.article`
  grid-column: 2;
  grid-row: 2;

  padding-top: 1rem;
`;
function DisplayPost({ post, user, token, onLogout }) {
  const { error, loading, data } = useGetData(`posts/${post.id}/comments`);
  const [userComment, setUserComment] = useState(null);
  const { error: postError, result, isLoading } = usePostData(userComment, `posts/${post.id}/comments`, token);
  const { error: delError, result: delResult, delData } = useDelData();
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");
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

  useEffect(() => {
    if (error?.status === 401 || delError?.status === 401) {
      onLogout();
    }
  }, [error, delError, onLogout]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const form = new FormData(e.target);
    const formJson = Object.fromEntries(form.entries());
    
    // console.log(formJson);
    setUserComment(formJson);
  };

  const handleChange = (e) => {
    setNewComment(e.currentTarget.value);
  };

  const handleDeleteComment = async (commentId, postId) => {
    // User can cancel deleting their comment
    if (window.confirm("Deletar este comentário?")) {
      const path = `posts/${postId}/comments/${commentId}`
      await delData(path, token);

      setCommentList(
        commentList.filter(cl => cl.id !== commentId)
      );
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <>
      <ArticlePost>
        <h3>{post.title}</h3>
        <p className="date">Criado em {prettifyDate(post.createdAt, "fullDate")}</p>
        <RenderHtml display={post.content}/>
        <p>Por {post.author.firstName + " " + post.author.lastName}</p>
      </ArticlePost>
      {/* <hr /> */}
      {/* TODO: comments count to be up to date */}
      <ArticleComment>
        {/* Field for user to comment */}
        {(user?.type === "user") && <CreateComment 
          token={token}
          handleSubmit={handleSubmit}
          newComment={newComment}
          handleChange={handleChange}
        />}
        {(data && (commentList?.length === 0)) ? <p>sem comentários</p> : <p>comentários({post._count.comments})</p>}
        {isLoading && <p>loadings com</p>}
        {(data && commentList) && commentList.map((comment) => (
          <DisplayComment
            comment={comment}
            key={comment.id}
            user={user}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </ArticleComment>
    </>
  );
}

const size = "40px";
const ButtonDelete = styled(Button)`
  background: transparent;
  border: none;
  padding: 0 1em;
  font-size: 0.8rem;
`;
const StyledSection = styled.section`
  display: grid;
  grid-template-columns: max-content 5fr;
  grid-column-gap: 1rem;

  margin-top: 1.5rem;
  text-align: start;

  & > div:nth-of-type(1) {
    grid-row: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${size};
    height: ${size};

    background-color: rgb(58, 12, 102);
    border-radius: 50%;

    font-size: 2rem;
    margin: auto;
  }
  & > p {
    margin-left: 1rem;
  }
  & span.user {
    font-weight: bolder;
    font-size: 1.2rem;
  }
  & span.date {
    font-size: 0.8rem;
  }
`;
function DisplayComment({ comment, user, handleDeleteComment }) {
  return (
    <StyledSection>
      <div>{comment.username.username.at(0)}</div>
      <div>
        <span className="user">{comment.username.username} • </span>
        <span className="date">{prettifyDate(comment.createdAt)}</span>
        {(comment.usernameId === user?.id) && <ButtonDelete
          text={"remover comentário"}
          handleClick={() => handleDeleteComment(comment.id, comment.postId)}
        ></ButtonDelete>}
        </div>
      <p>{comment.content}</p>
    </StyledSection>
  );
}

const StyledPostCommentDiv = styled.div`
  

  /* margin-top: 1rem; */
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & span {
    /* justify-self: end; */
    text-align: end;
  }
  
  & textarea {
    /* color: #0088ff; */
    background-color: rgba(60, 5, 111, 0.8);

    width: 30em;
    height: 8em;
    resize: none;

    border: 2px solid rgb(58, 12, 102);
    border-radius: 3px;
  }
  & textarea:focus, textarea:focus-visible {
    box-shadow: 0px 0px 13px 3px #8a2be2;
    outline: 1px inset #8a2be2;
  }
`;
function CreateComment({ token, handleSubmit, newComment, handleChange }) {

  return (
    <StyledPostCommentDiv>
      Deixar um comentário
      <StyledForm onSubmit={handleSubmit}>
        <label>
          <textarea 
            // cols={40}
            // rows={10}
            name="content" 
            id="newComment"
            value={newComment}
            disabled={!token}
            onChange={handleChange}
          ></textarea>
        </label>
        <span>{newComment.length} caractere{newComment.length >= 2 ? "s" : ""}</span>
        <Button 
          type={"submit"} 
          isDisabled={newComment.length === 0}
          text={"comentar"}
        />
      </StyledForm>
    </StyledPostCommentDiv>
  );
}

export default Posts;