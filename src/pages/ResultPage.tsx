import s from '../styles/schedule.module.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MatchItem from '../components/schedulePage/matchItem'
import useSWR from 'swr'
import axios from 'axios'
import { LeagueProps } from './SchedulePage'

export type MatchType = 'schedule' | 'result' | 'predict'

export interface MatchLProps {
	leagueId: number
	leagueName: string
	schedule: {
		[key: string]: {
			match_id: number
			home_team_name: string
			away_team_name: string
			time_start: string
			predicted_result?: string | null
			result?: string | null
			penalty_result?: string | null
		}[]
	}
}

export interface MatchDProps {
	[key: string]: {
		leagueId: number
		schedule: {
			match_id: number
			home_team_name: string
			away_team_name: string
			time_start: string
			predicted_result?: string | null
			result?: string | null
			penalty_result?: string | null
			date?: string
		}[]
	}
}

export function getDates(type: -1 | 1): string[] {
	const date = new Date()
	const arr = Array<string>(7)
	let mm = date.getMonth() + 1
	let dd = date.getDate()
	let str = [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, date.getFullYear()].join('-')
	arr[0] = str
	for (let i = 1; i < 7; i++) {
		date.setDate(date.getDate() + type)
		mm = date.getMonth() + 1
		dd = date.getDate()
		str = [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, date.getFullYear()].join('-')
		arr[i] = str
	}
	return arr
}
export default function ResultPage() {
	const dates = getDates(-1)
	const postFetcher = (url: string) => axios.post(url).then((res) => res.data)
	const { data } = useSWR('http://football.local.com:80/api/league/list', postFetcher)
	const [param, setParam] = useSearchParams()
	const leagueList = data?.data as LeagueProps[]
	const [date, setDate] = useState<string | null>(dates[0])
	const [league, setLeague] = useState<number | null>(
		param.get('league') === null && leagueList
			? null
			: leagueList?.findIndex((e) => e.id.toString() === param.get('league'))
	)

	const [dmatch, setDMatch] = useState<MatchDProps | null>(null)
	const [lmatch, setLMatch] = useState<MatchLProps | null>(null)

	useEffect(() => {
		axios
			.post('http://football.local.com:80/api/match/list_matches_by_day', { days: 0, type: 'result' })
			.then((res) => setDMatch(res.data.data as MatchDProps))
			.catch((err) => console.error(err))
	}, [])

	useEffect(() => {
		if (date !== null) {
			if (lmatch !== null) setLMatch(null)
			setLeague(null)
			axios
				.post('http://football.local.com:80/api/match/list_matches_by_day', {
					days: dates.indexOf(date),
					type: 'result',
				})
				.then((res) => setDMatch(res.data.data as MatchDProps))
				.catch((err) => console.error(err))
		}
	}, [date])

	useEffect(() => {
		if (league !== null && league !== undefined) {
			if (dmatch !== null) setDMatch(null)
			setDate(null)
			axios
				.post('http://football.local.com:80/api/match/list_matches_by_league', {
					leagueId: league,
					type: 'result',
				})
				.then((res) => setLMatch(res.data.data as MatchLProps))
				.catch((err) => console.error(err))
		}
	}, [league])

	console.log(lmatch)
	console.log(dmatch)

	return (
		<div className={s.container}>
			<div className={s.mainSection}>
				{date !== null ? (
					<div className={s.date}>
						<ul>
							{dates.map((e) => (
								<li
									key={e}
									className={date === e ? s.selectedDate : ''}
									onClick={() => {
										setDate(e)
									}}
								>
									{e.substring(0, e.lastIndexOf('-'))}
								</li>
							))}
						</ul>
					</div>
				) : null}

				{dmatch !== null && dmatch !== undefined
					? Object.keys(dmatch).map((item) => {
							return (
								<div key={item}>
									<h1>{item}</h1>
									<ul className={s.listMatch}>
										{dmatch[item].schedule.map((e) => (
											<div key={e.match_id}>
												<li>
													<MatchItem data={e} type="result" />
												</li>
												<hr />
											</div>
										))}
									</ul>
								</div>
							)
					  })
					: null}

				{lmatch !== null && lmatch !== undefined ? (
					<div key={lmatch.leagueId}>
						{lmatch.leagueName ? (
							<h1 className={s.lH1}>Lịch thi đấu {lmatch.leagueName}</h1>
						) : (
							<h1 className={s.lH1}>Không có thông tin</h1>
						)}
						{Object.keys(lmatch.schedule).map((item) => (
							<div className={s.lDiv} key={item}>
								<h2>{item}</h2>
								<ul className={s.listMatch}>
									{lmatch.schedule[item].map((e) => (
										<div key={e.match_id}>
											<li>
												<MatchItem data={e} type="result" />
											</li>
											<hr />
										</div>
									))}
								</ul>
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className={s.menu}>
				<h3>Giải đấu</h3>
				<div className={s.line}></div>
				<ul>
					{leagueList?.map((e) => {
						return (
							<li
								key={e.id}
								className={s.tabItem}
								data-onfocus={league === e.id ? 'true' : 'false'}
								onClick={() => {
									if (e.id !== league) {
										setParam(new URLSearchParams(`?league=${e.id}`))
										console.log(e.id)
										setLeague(e.id)
									} else {
										setDate(dates[0])
										setParam('')
										setLeague(null)
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
