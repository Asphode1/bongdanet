import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import MainTab from '../components/playerPage/mainTab'
import PostTab from '../components/playerPage/postTab'
import s from '../styles/club.module.css'

const tabs = [
	{
		path: 'chung',
		name: 'Chung',
	},
	{
		path: 'bai-viet',
		name: 'Bài viết',
	},
]

export default function PlayerPage() {
	const { pId } = useParams()
	const id = parseInt(pId)
	const [param, setParam] = useSearchParams()
	const [tab, setTab] = useState<number>(tabs.findIndex((e) => e.path === param.get('tab')))

	return (
		<div className={s.container}>
			<ul className={s.tabBar}>
				{tabs.map((e, index) => {
					return (
						<li
							key={index}
							className={`${s.tabItem} ${s.double}`}
							data-focused={index === tab ? 'true' : 'false'}
							onClick={() => {
								if (e.path !== param.get('tab')) {
									setTab(index)
									setParam(new URLSearchParams(`?tab=${e.path}`))
								}
							}}
						>
							<span>{e.name}</span>
						</li>
					)
				})}
				<li className={`${s.underline} ${s.doubleLine}`} style={{ left: `${tab * 48.5 + 1.5}%` }}></li>
			</ul>
			<div className={s.content}>{[<MainTab id={id} />, <PostTab id={id} />][tab]}</div>
		</div>
	)
}
