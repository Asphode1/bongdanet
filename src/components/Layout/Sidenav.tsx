import { Link } from 'react-router-dom'
import s from '../../styles/sidenav.module.css'
import img from '../../assets/user.png'
import useUser from '../../hooks/useUser'
import axios from 'axios'
import useSWR from 'swr'

type StateType = 'followings' | 'suggested'
type ObjectType = 'club' | 'footballer'

interface FetcherProps {
	state: StateType
	obj: ObjectType
}

interface ClubProps {
	club_id: number
	club_name: string
}

interface PlayerProps {
	footballer_id: number
	footballer_name: string
}

interface ClubIDProps {
	id: number
	name: string
}

interface PlayerIDProps {
	id: number
	name: string
}

export default function Sidenav() {
	const { user } = useUser()
	const fetcher = (prop: FetcherProps) =>
		axios
			.post(`http://football.local.com:80/api/followings/get_${prop.state}_${prop.obj}`, {
				userId: user?.id,
			})
			.then((res) => res.data.data)
	const { data: fc } = useSWR<ClubProps[]>(user ? { state: 'followings', obj: 'club' } : null, fetcher)
	const { data: rc } = useSWR<ClubIDProps[]>(user ? { state: 'suggested', obj: 'club' } : null, fetcher)
	const { data: fp } = useSWR<PlayerProps[]>(user ? { state: 'followings', obj: 'footballer' } : null, fetcher)
	const { data: rp } = useSWR<PlayerIDProps[]>(user ? { state: 'suggested', obj: 'footballer' } : null, fetcher)
	return (
		<>
			{user ? null : (
				<div className={s.noUserWrapper}>
					<h3>
						<Link to={'/login'}>Đăng nhập</Link> để theo dõi các câu lạc bộ, cầu thủ.
					</h3>
				</div>
			)}
			<div className={s.container}>
				<h1>Câu lạc bộ</h1>
				<section className={s.section}>
					<h3>Đang theo dõi</h3>
					<ul>
						{fc?.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-lac-bo/${e.club_id}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e.club_name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
					<h3>Gợi ý</h3>
					<ul>
						{rc?.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-lac-bo/${e.id}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e.name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
			<div className={s.line}></div>
			<div className={s.container}>
				<h1>Cầu thủ</h1>
				<section className={s.section}>
					<h3>Đang theo dõi</h3>
					<ul>
						{fp?.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-thu/${e.footballer_id}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e.footballer_name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
					<h3>Gợi ý</h3>
					<ul>
						{rp?.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-thu/${e.id}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e.name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
		</>
	)
}
