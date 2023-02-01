import { Link } from 'react-router-dom'
import s from '../../styles/sidenav.module.css'
import img from '../../assets/user.png'
import useUser from '../../hooks/useUser'
import axios from 'axios'
import useSWR from 'swr'

const fp = ['Lionel Messi', 'Christiano Ronaldo']
const rp = ['Eden Hazard']

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

export default function Sidenav() {
	const { user } = useUser()
	const fetcher = (prop: FetcherProps) =>
		axios
			.post(`http://football.local.com:80/api/followings/get_${prop.state}_${prop.obj}`, {
				userId: user?.id,
			})
			.then((res) => res.data.data)
	const { data: fc } = useSWR<ClubProps[]>({ state: 'followings', obj: 'club' }, fetcher)
	const { data: rc } = useSWR<ClubProps[]>({ state: 'suggested', obj: 'club' }, fetcher)
	const { data: fp } = useSWR<PlayerProps[]>({ state: 'followings', obj: 'footballer' }, fetcher)
	const { data: rp } = useSWR<PlayerProps[]>({ state: 'suggested', obj: 'footballer' }, fetcher)
	return (
		<>
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
									<Link to={`/cau-lac-bo/${e.club_id}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e.club_name}</span>
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
									<Link to={`/cau-thu/${e.footballer_id}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e.footballer_name}</span>
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
