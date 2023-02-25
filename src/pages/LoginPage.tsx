import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from '../styles/login.module.css'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import axios from 'axios'
import useSWR from 'swr'
import useUser from '../hooks/useUser'
import { UserType } from '../context/user-context'

interface loginFetcherProps {
	url: string
	user: string
	pass: string
}

interface userFetcherProps {
	url: string
	phone: string
}

interface userResProps {
	id: number
	user_name: string
	phone: string
}

export default function LoginPage() {
	const [submit, setSubmit] = useState<boolean>(false)
	const [username, setUsername] = useState<string>('')
	const [pass, setPass] = useState<string>('')
	const [save, setSave] = useState<boolean>(false)
	const { setUser } = useUser()
	const navigate = useNavigate()
	const loginFetcher = ({ url, user, pass }: loginFetcherProps) =>
		axios.post(url, { phone: user, password: pass }).then((res) => res.data)

	const userFetcher = ({ url, phone }: userFetcherProps) => axios.post(url, { phone }).then((res) => res.data.data)

	const {
		data: token,
		mutate: loginMutate,
		error,
	} = useSWR(submit ? { url: 'http://football.local.com:80/api/auth/login', user: username, pass } : null, loginFetcher)

	const { data: userLogin, mutate: userMutate } = useSWR<userResProps>(
		token ? { url: 'http://football.local.com:80/api/auth/get_user_infor', phone: username } : null,
		userFetcher
	)

	const isLoadingInit = !token && !error && submit

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { usr, pss, remember } = document.forms[0]
		setUsername(usr.value)
		setPass(pss.value)
		setSave(remember.checked)
		setSubmit(true)
		loginMutate()
		userMutate()
	}

	useEffect(() => {
		if (token && userLogin) {
			const u: UserType = {
				id: userLogin.id,
				api_token: token.api_token as string,
				phone: username,
				user_name: userLogin.user_name,
			}
			setUser(u)
			if (save) {
				console.log(save)
				localStorage.setItem('user', JSON.stringify(u))
			}
			navigate('/')
		}
	}, [token, userLogin])

	return (
		<div className={s.container}>
			<div className={s.loginContainer}>
				<SportsSoccerIcon className={s.spin} onClick={() => navigate('/')} />
				<h1>Đăng nhập</h1>
				<div className={s.line}></div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="">
							<input required name="usr" type="text" className={s.input} placeholder={'Tên đăng nhập/SĐT'} />
						</label>
					</div>
					<div>
						<label htmlFor="">
							<input required name="pss" type="password" className={s.input} placeholder={'Mật khẩu'} />
						</label>
					</div>
					<div className={s.forget}>
						<label htmlFor="remember">
							<input name="remember" type="checkbox" />
							<span>Nhớ mật khẩu</span>
						</label>
						<a href="">Quên mật khẩu ?</a>
					</div>
					<div className={s.loginBtn}>
						<button type="submit" disabled={isLoadingInit}>
							Đăng nhập
						</button>
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
