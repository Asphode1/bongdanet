import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreatePost, adminEditPost } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'
import useUser from '../../../hooks/useUser'

interface Props {
	id?: number
	title?: string
	content?: string
	isView?: boolean
	setState: Dispatch<SetStateAction<number>>
}

export default function PostForm({ id, title, content, isView, setState }: Props) {
	const [err, setErr] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)
	const { user } = useUser()
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			if (formData.get('title')?.length === 0 || formData.get('content')?.length === 0) {
				setErr(true)
			} else {
				if (isView === undefined) {
					axios
						.post(
							adminCreatePost,
							{ title: formData.get('title'), content: formData.get('content') },
							{
								headers: { Authorization: `Bearer ${user?.api_token}` },
							}
						)
						.then((res) => {
							console.log(res)
							setState(1)
						})
						.catch((err) => {
							console.error(err)
							setState(-1)
						})
				} else {
					axios
						.post(
							adminEditPost,
							{ postId: id, title: formData.get('title'), content: formData.get('content') },
							{
								headers: { Authorization: `Bearer ${user?.api_token}` },
							}
						)
						.then((res) => {
							console.log(res)
							setState(1)
						})
						.catch((err) => {
							console.error(err)
							setState(-1)
						})
				}
			}
		}
	}
	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<h1>{isView === undefined ? 'Thêm mới' : isView ? 'Thông tin chi tiết' : 'Chỉnh sửa'}</h1>
			<input
				type="text"
				name="title"
				placeholder="Tiêu đề"
				defaultValue={title ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<textarea
				name="content"
				placeholder="Nội dung"
				defaultValue={content ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			></textarea>
			{isView === undefined ? (
				<div>
					{err ? <span>Vui lòng nhập đủ thông tin</span> : null}
					<button type="submit">Thêm</button>
				</div>
			) : null}
			{isView === false ? (
				<div>
					{err ? <span>Vui lòng nhập đủ thông tin</span> : null}
					<button type="submit" className={s.greenbtn}>
						Lưu
					</button>
				</div>
			) : null}
		</form>
	)
}
