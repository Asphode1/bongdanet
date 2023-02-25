import { Link } from 'react-router-dom'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import s from '../../styles/admin/main.module.css'
import { useState } from 'react'

const paths = [
	{
		name: 'chung',
		path: '/',
	},
	{
		name: 'abc',
		path: '/abc',
	},
	{
		name: 'def',
		path: '/def',
	},
]

export default function Sidenav() {
	const [tab, setTab] = useState(0)

	return (
		<>
			<div className={s.icon}>
				<SportsSoccerIcon className={s.spin} />
				<h2>BongDaNet</h2>
			</div>
			<ul>
				{paths.map((e, index) => (
					<li key={index} data-focus={tab === index} className={s.navlist}>
						<Link to={`/admin${e.path}`}>
							<span>{e.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
