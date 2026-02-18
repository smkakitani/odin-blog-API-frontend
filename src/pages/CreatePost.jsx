// Styles
import styled from "styled-components";
// React
import { useState, useRef } from "react";
// Router
import { Link } from "react-router";
// Components
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
// Custom hook | utils
import { useAuth } from "../utils/AuthContext";
import usePostData from "../api/usePostData";
import RenderHtml from "../components/RenderHtml";
import { prettifyDate } from "../utils/lib";



// 
const DivNewPost = styled.div`
  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);

  padding: 1em;

  & > h3 {
    font-size: 1.7rem;
  }
`;
export default function CreatePost() {
  const { token } = useAuth();
  const [newPost, setNewPost] = useState(null);
  const { error, isLoading, result } = usePostData(newPost, `posts`, token);
  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editorRef.current) {
      const form = new FormData(e.target);
      const formJson = Object.fromEntries(form.entries());
      const content = editorRef.current.getContent();
      formJson.content = content;

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
        <DivNewPost>
          <h3>{result.title}</h3>
          <p className="date">Criado em {prettifyDate(result.createdAt, "fullDate")}</p>
          <RenderHtml display={result.content}/>
        </DivNewPost>
      ) : (
        <NewPostForm 
          error={error}
          handleSubmit={handleSubmit}
          editorRef={editorRef}
        />
      )}
    </div>
  );
}

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 1em;

  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);

  & p.errorMsg {
    color: red;
  }
`;
const InputStyle = styled.input`
  width: 35em;
  border: 1px inset #8a2be2;

  margin-left: 0.5rem;

  &:focus {
    box-shadow: 0px 0px 13px 3px #8a2be2;
  }
  &:focus-visible {
    outline: 1px inset #8a2be2;
  }
`;
const FieldsetStyle = styled.fieldset`
  min-width: 35%;
  display: flex;
  justify-content: space-evenly;

  border: 3px ridge rgb(58, 12, 102);
  padding: 1em;

  & > label > input[type="radio"] {
    accent-color: #ff3985;
    margin-right: 0.25em;
  }
`;
function NewPostForm({ 
  error, 
  handleSubmit, 
  editorRef,
}) {
  
  return (
    <div>
      <FormStyle 
        onSubmit={handleSubmit}
      >
        {error && error.err.map((err) => <p className="errorMsg" key={err.path}>{err.msg}</p> )}
        <label>Título do post: 
          <InputStyle 
            type="text" 
            name="title"
            id="title"
            minLength="1"
          />
        </label>
        <FieldsetStyle>
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
        </FieldsetStyle>
        {<TextEditor 
          ref={editorRef}
        />}
        <Button 
          type="submit"
          text="criar post"
        />
      </FormStyle>
    </div>
  );
}