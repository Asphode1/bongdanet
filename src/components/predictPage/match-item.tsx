import { MatchProps } from '/temp3'
import s from '../../styles/schedule.module.css'

export default function MatchItem(data: MatchProps) {
	return (
		<div className={s.matchPItem}>
			<div>
				<div className={s.pteam}>
					<img src={`../../../public/img/${(data.team1.length % 10) + 1}.jpg`} alt="team1" />
					<span>{data.team1}</span>
				</div>
				<div className={s.presult}>
					<span>{Math.round(data.team1Rate * 100) ?? '-'} %</span>
					<span>&nbsp;:&nbsp;</span>
					<span>{Math.round(data.team2Rate * 100) ?? '-'} %</span>
				</div>
				<div className={s.pteam}>
					<img src={`../../../public/img/${(data.team2.length % 10) + 1}.jpg`} alt="team2" />
					<span>{data.team2}</span>
				</div>
			</div>
			<div>
				<p>Tỉ lệ hoà: {Math.round(data.drawRate * 100)} %</p>
			</div>
		</div>
	)
}
