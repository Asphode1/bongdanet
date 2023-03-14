import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import s, { lH1 } from '../styles/schedule.module.css'
import useSWR from 'swr'
import axios from 'axios'
import { getDates, MatchDProps, MatchLProps } from './ResultPage'
import MatchItem from '../components/schedulePage/matchItem'

export interface LeagueProps {
	id: number
	name: string
	short_name: string | null
}

export default function SchedulePage() {
	const dates = getDates(1)
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
			.post('http://football.local.com:80/api/match/list_matches_by_day', { days: 0, type: 'predict' })
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
					type: 'predict',
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
					type: 'predict',
				})
				.then((res) => setLMatch(res.data.data as MatchLProps))
				.catch((err) => console.error(err))
		}
	}, [league])

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
													<MatchItem data={e} type="predict" />
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
										<div key={item}>
											<li>
												<MatchItem data={e} type="predict" />
											</li>
											<hr />
										</div>
									))}
								</ul>
							</div>
						))}
					</div>
				) : null}
				{(dmatch !== null && dmatch !== undefined && dmatch.leagueId !== undefined) ||
				(lmatch !== null && lmatch !== undefined && lmatch.leagueId !== undefined) ? null : (
					<h1 className={s.lH1}>Không có dữ liệu</h1>
				)}
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
