import { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import MainTab from '../components/CLBPage/MainTab'
import PlayerTab from '../components/CLBPage/PlayerTab'
import PostsTab from '../components/CLBPage/PostsTab'
import s from '../styles/club.module.css'

const tabs = [
	{
		path: 'chung',
		name: 'Chung',
	},
	{
		path: 'cau-thu',
		name: 'Cầu thủ',
	},
	{
		path: 'bai-viet',
		name: 'Bài viết',
	},
]

export default function CLBPage() {
	const { cId } = useParams()
	const id = parseInt(cId ?? '')
	const [tabParam, setTabParam] = useSearchParams()
	const [tabIndex, setTabIndex] = useState<number>(tabs.findIndex((e) => e.path === tabParam.get('tab')))

	const navigate = useNavigate()
	useEffect(() => {
		navigate(`/cau-lac-bo/${cId}?tab=chung`)
		setTabIndex(0)
	}, [cId])

	return (
		<div className={s.container}>
			<ul className={s.tabBar}>
				{tabs.map((e, index) => {
					return (
						<li
							key={index}
							className={`${s.tabItem} ${s.triple}`}
							data-focused={index === tabIndex ? 'true' : 'false'}
							onClick={() => {
								if (e.path !== tabParam.get('tab')) {
									setTabParam(new URLSearchParams(`?tab=${e.path}`))
									setTabIndex(index)
								}
							}}
						>
							<span>{e.name}</span>
						</li>
					)
				})}
				<li className={`${s.underline} ${s.tripleLine}`} style={{ left: `${tabIndex * 32.5 + 1.25}%` }}></li>
			</ul>
			<div className={s.content}>{[<MainTab id={id} />, <PlayerTab id={id} />, <PostsTab id={id} />][tabIndex]}</div>
		</div>
	)
}
