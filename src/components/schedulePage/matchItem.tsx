import s from '../../styles/schedule.module.css'

export interface MatchItemProps {
  team1: string
  team2: string
  score1: number | null
  score2: number | null
}

export default function MatchItem(data: MatchItemProps) {
  return (
    <div className={s.matchItem}>
      <div className={s.team}>
        <img src={`../../../public/img/${(data.team1.length % 10) + 1}.jpg`} alt="team1" />
        <span>{data.team1}</span>
      </div>
      <div className={s.result}>
        <span>{data.score1 ?? '-'}</span>
        <span>&nbsp;:&nbsp;</span>
        <span>{data.score2 ?? '-'}</span>
      </div>
      <div className={s.team}>
        <img src={`../../../public/img/${(data.team2.length % 10) + 1}.jpg`} alt="team2" />
        <span>{data.team2}</span>
      </div>
    </div>
  )
}
