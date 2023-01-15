import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MatchItem from '../components/schedulePage/matchItem'
import s from '../styles/schedule.module.css'
import data from '../assets/test2'

export default function SchedulePage() {
	const [param, setParam] = useSearchParams()
	const [league, setLeague] = useState<number>(
		param.get('league') === null ? -1 : data.findIndex((e) => e.league === param.get('league'))
	)
	const [match, setMatch] = useState<any[]>(data)

	return (
		<div className={s.container}>
			<div className={s.mainSection}>
				{data.map((e, index) => {
					return (
						<div key={index}>
							<h1>{e.name}</h1>
							<ul className={s.listMatch}>
								{e.matches.map((ee, index2) => {
									return (
										<li key={index2}>
											<MatchItem {...ee} />
										</li>
									)
								})}
							</ul>
						</div>
					)
				})}
			</div>
			<div className={s.menu}>
				<h3>Lịch thi đấu</h3>
				<div className={s.line}></div>
				<ul>
					{data.map((e, index) => {
						return (
							<li
								key={index}
								className={s.tabItem}
								data-onfocus={league === index ? 'true' : 'false'}
								onClick={() => {
									if (index !== league) {
										setParam(new URLSearchParams(`?league=${e.league}`))
										setLeague(index)
									} else {
										setParam('')
										setLeague(-1)
									}
								}}
							>
								<span>{e.name}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
