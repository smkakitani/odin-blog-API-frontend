// Styles

// TinyMCE - rich text editor
import { Editor } from "@tinymce/tinymce-react";



// 
export default function TextEditor({ ref, onDirty, initialValue }) {

  return (
    <>
      <Editor
        apiKey="2fgyetumwkdur5imzv6l7o9p985jfehh5dn447ur9b9kirx2"
        onInit={(_evt, editor) => ref.current = editor}
        onDirty={onDirty}
        ref={ref}
        initialValue={initialValue}

        init={{ 
          // skin: 'oxide-dark'/* "borderless" */ /* 'fabric' */,
          // min_width: '35%',
          // max_width: 900,
          // width: '50%',
          min_height: 500,
          max_height: 1000,
          // resize: 'true', // enables vertical resizing
          menubar: true,
          plugins: [ /* Open-source plugins! */
            'code', 'codesample', 'anchor', 'autolink', 'link', 'lists', 'advlist', 'charmap', 'emoticons', 'wordcount', 'preview', 'autoresize',
          ],
          toolbar_mode: 'wrap', 
          // toolbar_sticky: true,
          toolbar: 'undo redo | styles | ' +
            'link | bold italic forecolor backcolor fontfamily fontsize lineheight | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'code codesample | charmap emoticons' +
            'removeformat | print',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
}