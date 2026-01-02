// Styles

// React
import { useState, useRef } from "react";
// Router
import { Link } from "react-router";
// Components
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
// Custom hook
import { useAuth } from "../utils/AuthContext";
import usePostData from "../api/usePostData";
import RenderHtml from "../components/RenderHtml";



// 
export default function CreatePost() {
  const { token } = useAuth();
  const [newPost, setNewPost] = useState(null);
  const { error, isLoading, result } = usePostData(newPost, `posts`, token);
  const [dirty, setDirty] = useState(false);
  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editorRef.current) {
      const form = new FormData(e.target);
      const formJson = Object.fromEntries(form.entries());
      const content = editorRef.current.getContent();
      formJson.content = content;

      setDirty(false);
      editorRef.current.setDirty(false);

      // Send post to server
      setNewPost(formJson);
    }
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <Link to="../" relative="path">voltar</Link>
      {result ? ( 
        <>
          <h3>{result.title}</h3>
          <RenderHtml display={result.content}/>
        </>
      ) : (
        <NewPostForm 
          error={error}
          handleSubmit={handleSubmit}
          editorRef={editorRef}
          dirty={dirty}
          onDirty={() => setDirty(true)}
        />
      )}
    </div>
  );
}

function NewPostForm({ error, handleSubmit, editorRef, onDirty, dirty }) {
  
  return (
    <div>
      {error && error.err.map((err) => <p key={err.path}>{err.msg}</p> )}
      <form 
        onSubmit={handleSubmit}
      >
        <label>Título do post: 
          <input 
            type="text" 
            name="title"
            id="title"
            minLength="1"
          />
        </label>
        <legend>Publicar?</legend>
        <label>
          <input 
            type="radio" 
            name="published"
            value="no"
            defaultChecked={true}
          /> Não
        </label>
        <label>
          <input 
            type="radio" 
            name="published"
            value="yes"
          /> Sim
        </label>
        {<TextEditor 
          ref={editorRef}
          onDirty={onDirty}
        />}
        <Button 
          type="submit"
          text="salvar"
          isDisabled={!dirty}
        />
      </form>
    </div>
  );
}