import { useState, useCallback, useRef } from "react"
import axios from "axios"
import dynamic from "next/dynamic"

const MyEditor = dynamic(() => import("./components/MyEditor"), {
  ssr: false,
})

export default function Home() {
  const editorRef = useRef(null)
  const image_upload_handler = useCallback(
    async (blobInfo, success, failure, progress) => {
      const formData = new FormData()
      formData.append("file", blobInfo.blob(), blobInfo.filename())
      try {
        const { data } = await axios.post(
          "http://localhost:8080/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
              progress(percentCompleted)
            },
          }
        )
        success(data.location)
      } catch (e) {
        failure("이미지를 업로드 할 수 없습니다!")
      }
    },
    []
  )

  const getHtml = useCallback(() => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }, [editorRef])
  return (
    <>
      <MyEditor
        image_upload_handler={image_upload_handler}
        editorRef={editorRef}
      />

      <button onClick={getHtml}>getHtml</button>
    </>
  )
}
