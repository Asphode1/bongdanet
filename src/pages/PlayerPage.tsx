import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
			<div className={s.content}></div>
		</div>
	)
}
