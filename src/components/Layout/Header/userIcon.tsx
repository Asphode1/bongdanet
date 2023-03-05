import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { UserType } from '../../../context/user-context'
import img from '../../../../public/user.png'
import s from '../../../styles/layout.module.css'
import React, { useEffect, useState, useRef } from 'react'
import useUser from '../../../hooks/useUser'
import axios from 'axios'
import { logOutUrl } from '../../../utils/Urls'
import { useNavigate } from 'react-router'

interface UserIconProps {
	userprops: UserType
}

export default function UserIcon({ userprops }: UserIconProps) {
	const [expand, setExpand] = useState<boolean>(false)
	const { user, setUser } = useUser()

	const optRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = (e: Event) => {
			if (optRef.current && !optRef.current.contains(e.target)) {
				setExpand(false)
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [optRef])

	const navigate = useNavigate()

	const logoutHandler = (e: React.MouseEvent) => {
		e.preventDefault()
		axios.post(logOutUrl, { api_token: user?.api_token }).then((res) => res.data)
		setUser(null)
		localStorage.removeItem('user')
		navigate('/login')
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
			<div ref={optRef} className={s.expand} style={{ display: expand ? 'block' : 'none' }}>
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
