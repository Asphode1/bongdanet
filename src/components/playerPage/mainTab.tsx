import axios from 'axios'
import { FetcherProps, TabProps } from '../CLBPage/MainTab'
import useSWR from 'swr'
import { PlayerProps } from '../CLBPage/PlayerTab'
import s from '../../styles/player.module.css'
import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router'

export default function MainTab({ id }: TabProps) {
	const [followed, setFollowed] = useState(false)
	const postPlayerFetcher = ({ url, id }: FetcherProps) =>
		axios.post(url, { footballerId: id }).then((res) => res.data.data)

	const { user } = useUser()
	const navigate = useNavigate()

	const { data } = useSWR<PlayerProps>(
		{ url: 'http://football.local.com:80/api/footballer/info', id: id },
		postPlayerFetcher
	)

	useEffect(() => {
		if (user)
			axios
				.post('http://football.local.com:80/api/followings/get_followings_footballer', { userId: user?.id })
				.then((res) => res.data.data)
				.then((res) => {
					if (res.find((e) => e.footballer_id === id) !== undefined) setFollowed(true)
					else setFollowed(false)
				})
	}, [id])

	const handleFollow = (e: React.MouseEvent) => {
		e.preventDefault()
		if (user === null) navigate('/login')
		else {
			axios
				.post('http://football.local.com:80/api/followings/footballer/follow', { userId: user.id, footballerId: id })
				.then(() => {
					setFollowed((followed) => !followed)
				})
				.catch((err) => console.error(err))
		}
	}

	return (
		<div className={s.mainTab}>
			<div className={s.mainHead}>
				<img src={data ? `/img/${(data.id % 10) + 1}.jpg` : ''} alt="logo" />
				<div>
					<h1>{data?.full_name}</h1>
					<button type="button" onClick={handleFollow} className={followed ? s.followedBtn : s.followBtn}>
						{followed ? 'Đang theo dõi' : 'Theo dõi'}
					</button>
				</div>
			</div>
			<div>
				<h2>Quê quán</h2>
				<p>{data?.nationality}</p>
			</div>
			<div>
				<h2>Ngày sinh</h2>
				<p>{data?.date_of_birth}</p>
			</div>
			<div>
				<h2>Chiều cao</h2>
				<p>{data?.height} cm</p>
			</div>
			<div>
				<h2>CLB</h2>
				<p>{data?.club_name}</p>
			</div>
			<div>
				<h2>Số áo</h2>
				<p>{data?.clothers_number}</p>
			</div>
			<div>
				<h2>Giá thị trường</h2>
				<p>{data?.market_price}</p>
				<p></p>
			</div>
		</div>
	)
}
