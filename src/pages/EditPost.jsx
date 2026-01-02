// Styles
// React
import { useState, useRef } from "react";
// Router
import { Link } from "react-router";
// Components
import TextEditor from "../components/TextEditor";
import Button from "../components/Button";
// Custom hooks
import usePutData from "../api/usePutData";
import { useAuth } from "../utils/AuthContext";




// 
export default function EditPost({ postId, posts, user, token }) {
  const authorId = user.id;
  const [modifyData, setModifyData] = useState(null);
  const { error, result, isLoading } = usePutData(modifyData,`posts/${authorId}/${postId}`, token);
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  const postToEdit = posts.find(post => post.id === +postId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editorRef.current) {
      const form = new FormData(e.target);
      const formJson = Object.fromEntries(form.entries());
      const content = editorRef.current.getContent();
      formJson.content = content;

      setDirty(false);
      editorRef.current.setDirty(false);

      // Send edited post to server
      // console.log(content, formJson);
      setModifyData(formJson);
    }
  }
  // TODO: display result?

  return (
    <div>
      <Link to={"../.."} relative="path">voltar</Link>
      <form 
        onSubmit={handleSubmit}
      >
        <label>Título do post: 
          <input 
            type="text" 
            name="title"
            id="title"
            defaultValue={postToEdit.title}
            minLength="1"
          />
        </label>
        <legend>Publicar?</legend>
        <label>
          <input 
            type="radio" 
            name="published"
            value="no"
            defaultChecked={postToEdit.published === false}
          /> Não
        </label>
        <label>
          <input 
            type="radio" 
            name="published"
            value="yes"
            defaultChecked={postToEdit.published === true}
          /> Sim
        </label>
        <TextEditor 
          initialValue={postToEdit.content}
          ref={editorRef}
          onDirty={() => setDirty(true)}
        />
        <Button 
          type="submit"
          text="salvar"
          isDisabled={!dirty}
        />
      </form>
      {/* <div dangerouslySetInnerHTML={{__html: postToEdit.content}} /> */}
    </div>
  );
}