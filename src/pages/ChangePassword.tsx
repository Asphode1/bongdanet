import { FormEvent, useState } from 'react'
import useUser from '../hooks/useUser'
import s from '../styles/password.module.css'

export default function ChangePassword() {
	const { user, setUser } = useUser()
	const [oldP, setOldP] = useState('')
	const [newP, setNewP] = useState('')
	const [renewP, setRenewP] = useState('')

	const changePasswordFetcher = () => {}

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { old, newp, renew } = document.forms[0]
	}

	return (
		<div className={s.container}>
			<form className={s.form} onSubmit={submit}>
				<h1>Thay đổi mật khẩu</h1>
				<div>
					<div className={s.input}>
						<label>Mật khẩu cũ:</label>
						<input type={'password'} name="old" />
					</div>
					<div className={s.input}>
						<label>Mật khẩu mới:</label>
						<input type={'password'} name="newp" />
					</div>
					<div className={s.input}>
						<label>Xác nhận mật khẩu mới:</label>
						<input type={'password'} name="renew" />
					</div>
				</div>
				<div>
					<button type="submit">Xác nhận</button>
				</div>
			</form>
		</div>
	)
}
