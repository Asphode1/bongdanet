import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from '../styles/login.module.css'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import axios from 'axios'
import useUser from '../hooks/useUser'
import { UserType } from '../context/user-context'
import { getUser, login } from '../utils/Urls'

interface FetchProps {
	id: number
	phone: string
	user_name: string
}

export default function LoginPage() {
	const [token, setToken] = useState<string>('')
	const [resp, setResp] = useState<FetchProps | null>(null)
	const [save, setSave] = useState<boolean>(false)
	const [err, setErr] = useState<string>('')
	const { setUser } = useUser()
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { usr, pss, remember } = document.forms[0]
		setSave(remember.checked)
		axios
			.post(login, { phone: usr.value, password: pss.value })
			.then((res) => {
				setToken(res.data.api_token)
				return axios.post(getUser, { phone: usr.value })
			})
			.then((res) => {
				setResp(res.data.data as FetchProps)
			})
			.catch((err) => setErr(err.response.data.message))
	}

	useEffect(() => {
		if (resp !== null && token.length) {
			const u: UserType = {
				id: resp?.id!,
				api_token: token,
				phone: resp?.phone!,
				user_name: resp?.user_name!,
			}
			setUser(u)
			if (save) {
				localStorage.setItem('user', JSON.stringify(u))
			}
			navigate('/')
		}
	}, [resp, token])

	return (
		<div className={s.container}>
			<div className={s.loginContainer}>
				<SportsSoccerIcon className={s.spin} onClick={() => navigate('/')} />
				<h1>Đăng nhập</h1>
				<div className={s.line}></div>
				<form onSubmit={handleSubmit}>
					<p className={`${s.inputErr} ${err.length ? '' : s.none}`}>{err}</p>
					<div>
						<label htmlFor="">
							<input
								required
								onFocus={() => setErr('')}
								name="usr"
								type="text"
								className={s.input}
								placeholder={'Nhập SĐT'}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="">
							<input
								onFocus={() => setErr('')}
								className={s.input}
								required
								name="pss"
								type="password"
								placeholder={'Mật khẩu'}
							/>
						</label>
					</div>
					<div className={s.forget}>
						<label htmlFor="remember">
							<input name="remember" type="checkbox" />
							Nhớ mật khẩu
						</label>
						<a href="/quen-mat-khau">Quên mật khẩu ?</a>
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
