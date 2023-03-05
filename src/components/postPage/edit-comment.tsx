import { Dispatch, SetStateAction, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import useUser from '../../hooks/useUser'
import { editCmtUrl } from '../../utils/Urls'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import s from '../../styles/postPage.module.css'

interface Props {
  text: string
  commentId: number
  setEdit: Dispatch<SetStateAction<boolean>>
}

export default function EditComment({ text, commentId, setEdit }: Props) {
  const [cmt, setCmt] = useState(text)
  const { user } = useUser()
  const { pId } = useParams()

  const editCmt = () =>
    axios.post(editCmtUrl, { commentId, postId: parseInt(pId ?? ''), userId: user?.id, newComment: cmt })

  return (
    <>
      <ReactTextareaAutosize className={s.userCommentText} value={cmt} onChange={(e) => setCmt(e.target.value)} />
      <div className={s.editDiv}>
        <button type="button" onClick={() => setEdit(false)}>
          Huỷ
        </button>
        <button type="button" onClick={() => editCmt().then(() => setEdit(false))}>
          Lưu
        </button>
      </div>
    </>
  )
}
