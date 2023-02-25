import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import useUser from '../hooks/useUser'
import { useNavigate, Link } from 'react-router-dom'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import s from '../styles/login.module.css'
import { signupUrl } from '../utils/Urls'

interface SignupProps {
	url: string
	username: string
	phone: string
	password: string
}

export default function SignupPage() {
	const [submit, setSubmit] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [err, setErr] = useState<string>('')
	const { setUser } = useUser()
	const navigate = useNavigate()

	const signupFetcher = ({ url, username, phone, password }: SignupProps) =>
		axios.post(url, { username: username, phone: phone, password: password }).then((res) => res.data)

	const { mutate } = useSWR(submit ? { url: signupUrl, username: name, phone, password } : null, signupFetcher)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { username, usr, pss, repss } = document.forms[0]
		if (pss.value !== repss.value) {
			setErr('Mật khẩu không khớp')
			return
		}
		setName(username.value)
		setPhone(usr)
		setPassword(pss)
		setSubmit(true)
		mutate()
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
						<button type="submit">Đăng ký</button>
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
