import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import useSWR from 'swr'
import useUser from '../../hooks/useUser'
import s from '../../styles/club.module.css'

export interface TabProps {
	id: number
}

interface CLBProps {
	id: number
	full_name: string
	short_name: string
	founded_in: string
	owner: string
	website: string
}

export interface FetcherProps {
	url: string
	id: number
}

export default function MainTab({ id }: TabProps) {
	const [followed, setFollowed] = useState(false)

	const { user } = useUser()
	const navigate = useNavigate()

	useEffect(() => {
		if (user)
			axios
				.post('http://football.local.com:80/api/followings/get_followings_club', { userId: user?.id })
				.then((res) => res.data.data)
				.then((res) => {
					if (res.find((e) => e.club_id === id) !== undefined) setFollowed(true)
					else setFollowed(false)
				})
	}, [id])

	const handleFollow = (e: React.MouseEvent) => {
		e.preventDefault()
		if (user === null) navigate('/login')
		else {
			axios
				.post('http://football.local.com:80/api/followings/club/follow', { userId: user.id, clubId: id })
				.then(() => {
					setFollowed((followed) => !followed)
				})
				.catch((err) => console.error(err))
		}
	}

	const postCLBFetcher = ({ url, id }: FetcherProps) =>
		axios
			.post(url, {
				clubId: id,
			})
			.then((res) => res.data.data)
	const { data } = useSWR<CLBProps>({ url: 'http://football.local.com:80/api/club/info', id: id }, postCLBFetcher)

	return (
		<div className={s.mainContainer}>
			<div className={s.clbhead}>
				<img src={data ? `/img/${(data?.id % 10) + 1}.jpg` : ''} alt="club" />
				<div>
					<h1>{data?.full_name}</h1>
					<button type="button" onClick={handleFollow} className={followed ? s.followedBtn : s.followBtn}>
						{followed ? 'Đang theo dõi' : 'Theo dõi'}
					</button>
				</div>
			</div>
			<div>
				<h2>Tên gọi khác</h2>
				<p>{data?.short_name}</p>
			</div>
			<div>
				<h2>Chủ sở hữu</h2>
				<p>{data?.owner}</p>
			</div>
			<div>
				<h2>Nơi thành lập</h2>
				<p>{data?.founded_in}</p>
			</div>
			<div>
				<h2>Website</h2>
				<p>
					<a target="_blank" rel="noopener noreferrer" href={`${data?.website}`}>
						{data?.website}
					</a>
				</p>
			</div>
		</div>
	)
}
