import s from '../../styles/schedule.module.css'

export interface MatchItemProps {
	team1: string
	team2: string
	score1: number
	score2: number
}

export default function MatchItem(data: MatchItemProps) {
	return (
		<div className={s.matchItem}>
			<div className={s.team}>
				<img src="" alt="team1" />
				<span>{data.team1}</span>
			</div>
			<div className={s.result}>
				<span>{data.score1}</span>
				<span>&nbsp;:&nbsp;</span>
				<span>{data.score2}</span>
			</div>
			<div className={s.team}>
				<img src="" alt="team2" />
				<span>{data.team2}</span>
			</div>
		</div>
	)
}
