import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from '../styles/login.module.css'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

export default function LoginPage() {
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { usr, pss } = document.forms[0]
	}

	return (
		<div className={s.container}>
			<div className={s.loginContainer}>
				<SportsSoccerIcon className={s.spin} onClick={() => navigate('/')} />
				<h1>Đăng nhập</h1>
				<div className={s.line}></div>
				<form onSubmit={handleSubmit} className={s.form}>
					<div>
						<label htmlFor="">
							<input required name="usr" type="text" className={s.input} placeholder={'Tên đăng nhập'} />
						</label>
					</div>
					<div>
						<label htmlFor="">
							<input required name="pss" type="password" className={s.input} placeholder={'Mật khẩu'} />
						</label>
					</div>
					<div className={s.forget}>
						<a href="">Quên mật khẩu ?</a>
					</div>
					<div className={s.loginBtn}>
						<button type="submit">Đăng nhập</button>
					</div>
				</form>
				<div className={s.line}></div>
				<div className={s.signup}>
					<Link to="/signup">Đăng ký</Link>
				</div>
			</div>
		</div>
	)
}
