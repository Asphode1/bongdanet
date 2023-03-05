import s from '../../styles/postPage.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useUser from '../../hooks/useUser'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useEffect, useRef, useState } from 'react'
import ConfirmDeleteForm from './confirmDeleteForm'
import { useParams } from 'react-router-dom'
import EditComment from './edit-comment'

export interface PostCommentProps {
  userId: number
  userName: string
  commentId: number
  comment: string
  diffTime: string
}

export default function PostComment(props: PostCommentProps) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [del, setDel] = useState(false)
  const [offset, setOffset] = useState(false)
  const { user } = useUser()
  const optRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (optRef.current && !optRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [optRef])

  const { pId } = useParams()

  useEffect(() => console.log(offset), [offset])

  return (
    <div className={s.commentContainer}>
      {del ? (
        <ConfirmDeleteForm userId={props.userId} postId={pId} commentId={props.commentId} setDel={setDel} />
      ) : null}
      <div className={s.icon}>
        <AccountCircleIcon />
      </div>
      <div className={s.commentBlock}>
        <div className={`${!edit ? s.commentBG : s.commentEditBg}`}>
          {edit ? (
            <EditComment text={props.comment} setEdit={setEdit} commentId={props.commentId} />
          ) : (
            <>
              <div className={s.username}>{props ? props.userName : null}</div>
              <div>
                <span>{props?.comment}</span>
              </div>
            </>
          )}
          {open ? (
            <div ref={optRef} className={`${s.dropdown} ${offset ? s.divOffset : null}`}>
              <div className={s.dropdownOpt}>
                <div
                  onClick={() => {
                    setEdit(true)
                    setOpen(false)
                  }}
                >
                  <p>Chỉnh sửa bình luận</p>
                </div>
                <div
                  onClick={() => {
                    setDel(true)
                    setOpen(false)
                  }}
                >
                  <p>Xoá bình luận</p>
                </div>
              </div>
              <svg height="12" viewBox="0 0 25 12" width="25" className={`${offset ? null : s.offset}`}>
                <path d="M24.553.103c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V2.085C1.373 1.191.846.422.1.102h24.453z"></path>
              </svg>
            </div>
          ) : null}
        </div>
        {user?.id === props.userId && !edit ? (
          <div
            className={s.opts}
            onClick={(e) => {
              if (e.clientY > window.innerHeight - 80) setOffset(true)
              else {
                setOffset(false)
              }
              setOpen(true)
            }}
          >
            <MoreHorizIcon />
          </div>
        ) : null}
      </div>
    </div>
  )
}
