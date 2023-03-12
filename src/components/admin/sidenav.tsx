import { Link, useLocation } from 'react-router-dom'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import s from '../../styles/admin/main.module.css'
import { useState } from 'react'

const paths = [
	{
		name: 'Bài viết',
		path: '/',
	},
	{
		name: 'CLB',
		path: '/clb',
	},
	{
		name: 'Cầu thủ',
		path: '/cau-thu',
	},
	{
		name: 'Giải đấu',
		path: '/giai-dau',
	},
	{
		name: 'Trận đấu',
		path: '/tran-dau',
	},
	{
		name: 'Người dùng',
		path: '/nguoi-dung',
	},
]

export default function Sidenav() {
	const location = useLocation()
	const [tab, setTab] = useState('/' + location.pathname.split('/').at(-1))

	return (
		<>
			<div className={s.icon}>
				<SportsSoccerIcon className={s.spin} />
				<h2>BongDaNet</h2>
			</div>
			<ul>
				{paths.map((e) => (
					<li key={e.path} data-focus={tab === e.path} className={s.navlist}>
						<Link to={`/admin${e.path}`} onClick={() => setTab(e.path)}>
							<span>{e.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
