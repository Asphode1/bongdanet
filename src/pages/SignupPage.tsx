import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import useUser from '../hooks/useUser'
import { useNavigate, Link } from 'react-router-dom'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import s from '../styles/login.module.css'
import { signupUrl } from '../utils/Urls'
import { UserType } from '../context/user-context'

interface SignupProps {
	url: string
	username: string
	phone: string
	password: string
}

export default function SignupPage() {
	const [err, setErr] = useState<string>('')
	const { setUser } = useUser()
	const navigate = useNavigate()
	const [token, setToken] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		const { usrname, usr, pss, repss } = document.forms[0]
		if (pss.value !== repss.value) {
			setErr('Mật khẩu không khớp')
			return
		}
		axios
			.post('http://football.local.com:80/api/auth/register', {
				user_name: usrname.value,
				phone: usr.value,
				password: pss.value,
			})
			.then(() =>
				axios.post('http://football.local.com:80/api/auth/login', {
					phone: usr.value,
					password: pss.value,
				})
			)
			.then((res) => {
				setToken(res.data.api_token)
				return axios.post('http://football.local.com:80/api/auth/get_user_infor', {
					phone: usr.value,
				})
			})
			.then((res) => {
				const u: UserType = {
					id: res.data.id,
					user_name: res.data.user_name,
					phone: usr.value,
					api_token: token,
				}
				setUser(u)
				navigate('/')
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		if (err.length) alert(err)
	}, [err])

	return (
		<div className={s.container}>
			<div className={s.loginContainer}>
				<SportsSoccerIcon className={s.spin} onClick={() => navigate('/')} />
				<h1>Đăng ký</h1>
				<div className={s.line}></div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="usrname">
							<input required name="usrname" type="text" className={s.input} placeholder={'Tên người dùng'} />
						</label>
					</div>
					<div>
						<label htmlFor="usr">
							<input required name="usr" type="text" className={s.input} placeholder={'Tên đăng nhập/SĐT'} />
						</label>
					</div>
					<div>
						<label htmlFor="pss">
							<input required name="pss" type="password" className={s.input} placeholder={'Mật khẩu'} />
						</label>
					</div>
					<div>
						<label htmlFor="repss">
							<input required name="repss" type="password" className={s.input} placeholder={'Nhập lại mật khẩu'} />
						</label>
					</div>
					<div className={s.loginBtn}>
						<button type="submit" disabled={loading}>
							Đăng ký
						</button>
					</div>
				</form>
				<div className={s.line}></div>
				<div className={s.signup}>
					<Link to="/login">Đăng nhập</Link>
				</div>
			</div>
		</div>
	)
}
