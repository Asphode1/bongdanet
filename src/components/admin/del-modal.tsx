import React, { Dispatch, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'
import s from '../../styles/admin/modals.module.css'
import axios from 'axios'
import { TypeProps } from './add-new'
import useUser from '../../hooks/useUser'

interface Props {
	type: TypeProps
	url: string
	del: number
	setDel: Dispatch<SetStateAction<number | null>>
}

interface Param {
	type: TypeProps
	value: number
}

function getObj({ type, value }: Param) {
	switch (type) {
		case 'post':
			return { postId: value }
		case 'club':
			return { clubId: value }
		case 'footballer':
			return { footballerId: value }
		case 'match':
			return { matchId: value }
		case 'league':
			return { leagueId: value }
		case 'user':
			return { userId: value }
	}
}

export default function DeleteModal({ type, url, del, setDel }: Props) {
	const [state, setState] = useState(0)

	const { user } = useUser()
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		if (del !== null) {
			axios
				.post(url, getObj({ type, value: del }), {
					headers: { Authorization: `Bearer ${user?.api_token}` },
				})
				.then(() => {
					setState(1)
				})
				.catch((err) => {
					console.error(err)
					setState(-1)
				})
		}
	}

	return createPortal(
		<div className={`mmodal ${s.modal}`}>
			<div className={s.modalBox}>
				{state === 0 ? (
					<>
						<h2>Xác nhận xoá</h2>
						<div>
							<button type="button" onClick={() => setDel(null)} className={s.btn}>
								Huỷ
							</button>
							<button type="button" onClick={handleClick} className={s.greenbtn}>
								Xác nhận
							</button>
						</div>
					</>
				) : state == 1 ? (
					<>
						<h2>Xoá thành công</h2>
						<button type="button" onClick={() => setDel(null)} className={s.greenbtn}>
							Đóng
						</button>
					</>
				) : (
					<>
						<h2>Xoá thất bại</h2>
						<button type="button" onClick={() => setDel(null)} className={s.greenbtn}>
							Đóng
						</button>
					</>
				)}
			</div>
		</div>,
		document.body
	)
}
