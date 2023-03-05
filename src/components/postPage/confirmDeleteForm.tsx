import React, { Dispatch, SetStateAction, useState } from 'react'
import s from '../../styles/postPage.module.css'
import CloseIcon from '@mui/icons-material/Close'
import { createPortal } from 'react-dom'
import axios from 'axios'
import { delCmtUrl } from '../../utils/Urls'

interface DelFormProps {
	postId?: string
	commentId: number
	userId: number
	setDel: Dispatch<SetStateAction<boolean>>
}

export default function ConfirmDeleteForm({ postId, commentId, userId, setDel }: DelFormProps) {
	const handleDelete = (e: React.MouseEvent) => {
		e.preventDefault()
		axios.post(delCmtUrl, { commentId, postId, userId }).then((res) => res.data)
		setDel(false)
	}

	return createPortal(
		<div className={`${s.del} delModal`}>
			<div className={s.delForm}>
				<div className={s.delHeader}>
					<h1>Xác nhận xoá bình luận</h1>
					<button onClick={() => setDel(false)}>
						<CloseIcon />
					</button>
				</div>
				<hr />
				<div className={s.delDetail}>
					<p>Bình luận này sẽ được xoá vĩnh viễn</p>
					<div className={s.btnDiv}>
						<button onClick={() => setDel(false)}>Huỷ</button>
						<button onClick={handleDelete}>Xác nhận</button>
					</div>
				</div>
			</div>
		</div>,
		document.body
	)
}
