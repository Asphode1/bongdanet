import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { UserType } from '../../../context/user-context'
import img from '../../../assets/user.png'
import s from '../../../styles/layout.module.css'
import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import axios from 'axios'
import useSWR from 'swr'
import { logOutUrl } from '../../../utils/Urls'
import { useNavigate } from 'react-router'

interface UserIconProps {
	userprops: UserType
}

interface FetcherProps {
	url: string
	token: string
}

export default function UserIcon({ userprops }: UserIconProps) {
	const [expand, setExpand] = useState<boolean>(false)
	const [logout, setLogout] = useState<boolean>(false)
	const { user, setUser } = useUser()

	useEffect(() => {
		if (expand) {
			const listener = () => {
				console.log('chaned')
				setExpand(false)
			}
			window.addEventListener('click', listener)
			return window.removeEventListener('click', listener)
		}
	}, [expand])

	const navigate = useNavigate()

	const logoutFetcher = ({ url, token }: FetcherProps) => axios.post(url, { api_token: token }).then((res) => res.data)

	const { mutate } = useSWR(logout ? { url: logOutUrl, token: user?.api_token } : null, logoutFetcher)

	const logoutHandler = (e: React.MouseEvent) => {
		e.preventDefault()
		setLogout(true)
		mutate()
		setUser(null)
		localStorage.removeItem('user')
		navigate('/login')
		setLogout(false)
	}

	const changePassHandler = (e: React.MouseEvent) => {
		e.preventDefault()
		setExpand(false)
		navigate('/doi-mat-khau')
	}

	return (
		<div className={s.userIcon}>
			<div onClick={() => setExpand((expand) => !expand)}>
				<img src={img} alt="user" />
				<p>{userprops.user_name}</p>
				<div>
					<ArrowDropDownIcon />
				</div>
			</div>
			<div className={s.expand} style={{ display: expand ? 'block' : 'none' }}>
				<div className={s.btn}>
					<button type="button" onClick={changePassHandler}>
						Đổi mật khẩu
					</button>
				</div>
				<div className={s.btn}>
					<button type="button" onClick={logoutHandler}>
						Đăng xuất
					</button>
				</div>
			</div>
		</div>
	)
}
