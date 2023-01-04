import React from 'react'
import s from '../styles/login.module.css'

export default function LoginPage() {
	return (
		<div className={s.container}>
			<div className={s.loginContainer}>
				<h1>Đăng nhập</h1>
				<div className={s.line}></div>
				<form action="">
					<div>
						<label htmlFor="">
							<input type="text" className={s.input} placeholder={'Tên đăng nhập'} />
						</label>
					</div>
					<div>
						<label htmlFor="">
							<input type="password" className={s.input} placeholder={'Mật khẩu'} />
						</label>
					</div>
					<div>
						<a href="">Quên mật khẩu ?</a>
					</div>
				</form>
			</div>
		</div>
	)
}
