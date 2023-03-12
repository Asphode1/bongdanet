import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreateUser, adminEditUser } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'

interface Props {
	id?: number
	user_name?: string | null
	phone?: string | null
	isView?: boolean
	setState: Dispatch<SetStateAction<number>>
}

export default function UserForm({ id, user_name, phone, isView, setState }: Props) {
	const [err, setErr] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			if (formData.get('user_name')?.length === 0 || formData.get('phone')?.length === 0) {
				setErr(true)
			} else {
				if (isView === undefined) {
					if (formData.get('pass')?.length === 0) setErr(true)
					else
						axios
							.post(adminCreateUser, {
								password: formData.get('pass'),
								user_name: formData.get('user_name'),
								phone: formData.get('phone'),
							})
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
						.post(adminEditUser, { userId: id, userName: formData.get('user_name'), phone: formData.get('phone') })
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
				name="user_name"
				placeholder="Tên User"
				defaultValue={user_name ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="phone"
				placeholder="SĐT"
				defaultValue={phone ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			{isView === undefined ? (
				<input
					name="pass"
					placeholder="Mật khẩu"
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			) : null}

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
