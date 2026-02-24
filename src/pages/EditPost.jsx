// Styles
import styled from "styled-components";
// React
import { useState, useRef, useEffect } from "react";
// Router
import { Link, useNavigate } from "react-router";
// Components
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
// Custom hooks
import usePutData from "../api/usePutData";
import useGetData from "../api/useGetData";



// 
const DivStyle = styled.div`

`;
const FormEditPost = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 1em;

  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);
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
export default function EditPost({ postId, posts, user, token, onLogout }) {
  const { error: userError } = useGetData(`authors/${user?.id}`, token);
  const authorId = user?.id;
  const [modifyData, setModifyData] = useState(null);
  const { error, result, isLoading } = usePutData(modifyData,`posts/${authorId}/${postId}`, token);
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  const postToEdit = posts.find(post => post.id === +postId);
  const [published, setPublished] = useState(postToEdit.published === true ? "yes" : "no");
  const [titleValue, setTitleValue] = useState(postToEdit.title);
  const [enableSave, setEnableSave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userError?.status === 401) {
      onLogout();
    }
  }, [userError, onLogout]);

  const handleSubmit = async (e) => {
    if (editorRef.current) {
      const form = new FormData(e.target);
      const formJson = Object.fromEntries(form.entries());
      const content = editorRef.current.getContent();
      formJson.content = content;

      setDirty(false);
      editorRef.current.setDirty(false);

      // Send edited post to server
      setModifyData(formJson);
    }
  }

  const handleTitleChange = (e) => {

    setTitleValue(e.currentTarget.value);
    setEnableSave(true);
  };

  const handlePublish = (e) => {
    setPublished(e.currentTarget.value);
    setEnableSave(true);
  };

  // TODO: display result?

  return (
    <DivStyle>
      <Link to={"../.."} relative="path">voltar</Link>
      <p>
        ir para <Link to={`/posts/${postToEdit.id}`} >{postToEdit.title}</Link>
      </p>
      <FormEditPost 
        onSubmit={handleSubmit}
      >
        <label>Título do post: 
          <InputStyle 
            type="text" 
            name="title"
            id="title"
            // defaultValue={postToEdit.title}
            minLength="1"
            value={titleValue}
            onChange={handleTitleChange}
          />
        </label>
        <FieldsetStyle>
          <legend>Publicar?</legend>
          <label>
            <input
              type="radio"
              name="published"
              value="no"
              // defaultChecked={postToEdit.published === false}              
              // onClick={() => setPublished(false)}
              checked={published === "no"}
              onChange={handlePublish}
            /> Não
          </label>
          <label>
            <input
              type="radio"
              name="published"
              value="yes"
              // defaultChecked={postToEdit.published === true}
              // onClick={() => setPublished(true)}
              checked={published === "yes"}
              onChange={handlePublish}
            /> Sim
          </label>
        </FieldsetStyle>
        <TextEditor 
          initialValue={postToEdit.content}
          ref={editorRef}
          onDirty={() => setDirty(true)}
        />
        <Button 
          type="submit"
          text="salvar"
          isDisabled={dirty ? false : enableSave ? false : true} // if text editor is "dirty" or "published" is different from initial value, salvar should be enabled
        />
      </FormEditPost>
    </DivStyle>
  );
}