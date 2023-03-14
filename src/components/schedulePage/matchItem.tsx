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

export interface Props {
	type: 'schedule' | 'predict' | 'result'
	data: MatchItemProps
}
export default function MatchItem({ type, data }: Props) {
	const Res = () => (
		<div className={s.normalRes}>
			<span>{data.result?.length ? data.result.split('-')[0] : '-'}</span>
			<span>&nbsp;:&nbsp;</span>
			<span>{data.result?.length ? data.result.split('-')[1] : '-'}</span>
		</div>
	)

	const PRes = () => (
		<div className={s.pres}>
			<span>{data.predicted_result?.length ? data.predicted_result.split('-')[0] : '-'}</span>
			<span>&nbsp;:&nbsp;</span>
			<span>{data.predicted_result?.length ? data.predicted_result.split('-')[1] : '-'}</span>
		</div>
	)

	return (
		<div className={s.matchBlock}>
			<p>{data.time_start}</p>
			<div className={s.matchItem}>
				<div className={s.team}>
					<img src={`../../../public/img/${(data.home_team_name.length % 10) + 1}.jpg`} alt="team1" />
					<span>{data.home_team_name}</span>
				</div>
				<div className={s.result}>{type === 'schedule' || type === 'result' ? <Res /> : <PRes />}</div>
				<div className={s.team}>
					<img src={`../../../public/img/${(data.away_team_name.length % 10) + 1}.jpg`} alt="team2" />
					<span>{data.away_team_name}</span>
				</div>
			</div>
		</div>
	)
}
