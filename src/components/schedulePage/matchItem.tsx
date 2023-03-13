import s from '../../styles/schedule.module.css'

export interface MatchItemProps {
	match_id: number
	home_team_name: string
	away_team_name: string
	time_start: string
	predicted_result?: string | null
	result?: string | null
	penalty_result?: string | null
	date?: string
}

export default function MatchItem(data: MatchItemProps) {
	return (
		<div className={s.matchItem}>
			<div className={s.team}>
				<img src={`../../../public/img/${(data.home_team_name.length % 10) + 1}.jpg`} alt="team1" />
				<span>{data.home_team_name}</span>
			</div>
			<div className={s.result}>
				<span>{data.result?.length ? data.result.split('-')[0] : '-'}</span>
				<span>&nbsp;:&nbsp;</span>
				<span>{data.result?.length ? data.result.split('-')[1] : '-'}</span>
			</div>
			<div className={s.team}>
				<img src={`../../../public/img/${(data.away_team_name.length % 10) + 1}.jpg`} alt="team2" />
				<span>{data.away_team_name}</span>
			</div>
		</div>
	)
}
