import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MatchItem from '../components/schedulePage/matchItem'
import s from '../styles/schedule.module.css'
import useSWR from 'swr'
import axios from 'axios'
import dat, { DataProps } from '../../public/temp'

export interface LeagueProps {
  id: number
  name: string
  short_name: string | null
}

export default function SchedulePage() {
  const postFetcher = (url: string) => axios.post(url).then((res) => res.data)
  const { data } = useSWR('http://football.local.com:80/api/league/list', postFetcher)
  const [param, setParam] = useSearchParams()
  const leagueList = data?.data as LeagueProps[]
  const [league, setLeague] = useState<number>(
    param.get('league') === null && leagueList
      ? -1
      : leagueList?.findIndex((e) => e.id.toString() === param.get('league'))
  )

  const [match, setMatch] = useState<DataProps[]>(dat)

  useEffect(() => {
    if (league >= 0) {
      const name = leagueList?.at(leagueList?.findIndex((e) => e.id === league + 1))?.name
      setMatch(dat.filter((e) => e.name === name))
    } else setMatch(dat)
  }, [league])

  return (
    <div className={s.container}>
      <div className={s.mainSection}>
        {match.map((e, index) => {
          return (
            <div key={index}>
              <h1>{e.name}</h1>
              <ul className={s.listMatch}>
                {e.matches.map((ee, index2) => {
                  return (
                    <>
                      <li key={index2}>
                        <MatchItem {...ee} />
                      </li>
                      <hr />
                    </>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
      <div className={s.menu}>
        <h3>Giải đấu</h3>
        <div className={s.line}></div>
        <ul>
          {leagueList?.map((e, index) => {
            return (
              <li
                key={index}
                className={s.tabItem}
                data-onfocus={league === index ? 'true' : 'false'}
                onClick={() => {
                  if (index !== league) {
                    setParam(new URLSearchParams(`?league=${e.id}`))
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
