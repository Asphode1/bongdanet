import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreateLeague, adminEditLeague } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'
import useUser from '../../../hooks/useUser'

interface Props {
	id?: number
	name?: string | null
	short_name?: string | null
	isView?: boolean
	setState: Dispatch<SetStateAction<number>>
}

export default function LeagueForm({ id, name, short_name, isView, setState }: Props) {
	const [err, setErr] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)
	const { user } = useUser()
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			if (formData.get('name')?.length === 0 || formData.get('short_name')?.length === 0) {
				setErr(true)
			} else {
				if (isView === undefined) {
					axios
						.post(
							adminCreateLeague,
							{ name: formData.get('name'), shortName: formData.get('short_name') },
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
							adminEditLeague,
							{ leagueId: id, name: formData.get('name'), shortName: formData.get('short_name') },
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
				name="name"
				placeholder="Tên giải đấu"
				defaultValue={name ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="short_name"
				placeholder="Tên viết tắt"
				defaultValue={short_name ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
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
