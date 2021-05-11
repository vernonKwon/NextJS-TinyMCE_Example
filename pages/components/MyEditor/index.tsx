import React, { useState, useRef, useEffect, useCallback } from "react"
import { Editor } from "@tinymce/tinymce-react"

const Index = ({ image_upload_handler, editorRef }) => {
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue="<p>게시글을 작성하시면 됩니다.</p>"
      /*onEditorChange={(content) => setHtml(content)}*/
      apiKey="YOUR_API_KEY"
      cloudChannel="dev"
      init={{
        language: "ko_KR",
        language_url: "./langs/ko_KR.js",
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks fullscreen",
          "insertdatetime media table code help ",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent charmap | " +
          "image media removeformat table | preview code fullscreen " +
          "help",

        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

        images_upload_handler: image_upload_handler,
      }}
    />
  )
}

export default Index
