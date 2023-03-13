import { Dispatch, SetStateAction } from 'react'
import { TypeProps } from '../add-new'
import ClubForm from './club-form'
import FootballerForm from './footballer-form'
import LeagueForm from './league-form'
import MatchForm from './match-form'
import PostForm from './postForm'
import UserForm from './user-form'

interface Props {
  id?: number
  title?: string
  content?: string
  isView?: boolean
  full_name?: string | null
  short_name?: string | null
  founded_in?: string | null
  owner?: string | null
  website?: string | null
  nationality?: string | null
  place_of_birth?: string | null
  date_of_birth?: string | null
  height?: number | null
  club_id?: number | null
  club_name?: string | null
  clothers_number?: number | null
  market_price?: string | null
  name?: string | null
  user_name?: string | null
  phone?: string | null
  home_team_id?: number | null
  away_team_id?: number | null
  league_id?: number | null
  time_start?: string | null
  stadium?: string | null
  match_status?: string | null
  predicted_result?: string | null
  result?: string | null
  penalty_result?: string | null
  type: TypeProps
  setState: Dispatch<SetStateAction<number>>
}

export default function Form({
  id,
  title,
  content,
  full_name,
  short_name,
  founded_in,
  owner,
  website,
  nationality,
  place_of_birth,
  date_of_birth,
  height,
  name,
  club_id,
  club_name,
  clothers_number,
  market_price,
  user_name,
  phone,
  home_team_id,
  away_team_id,
  league_id,
  time_start,
  stadium,
  match_status,
  predicted_result,
  result,
  penalty_result,
  isView,
  type,
  setState,
}: Props) {
  switch (type) {
    case 'post':
      return <PostForm id={id} title={title} content={content} isView={isView} setState={setState} />
    case 'club':
      return (
        <ClubForm
          id={id}
          full_name={full_name}
          short_name={short_name}
          founded_in={founded_in}
          owner={owner}
          website={website}
          isView={isView}
          setState={setState}
        />
      )
    case 'footballer':
      return (
        <FootballerForm
          id={id}
          full_name={full_name}
          short_name={short_name}
          nationality={nationality}
          place_of_birth={place_of_birth}
          date_of_birth={date_of_birth}
          height={height}
          club_id={club_id}
          club_name={club_name}
          clothers_number={clothers_number}
          market_price={market_price}
          isView={isView}
          setState={setState}
        />
      )
    case 'league':
      return <LeagueForm id={id} name={name} short_name={short_name} isView={isView} setState={setState} />
    case 'user':
      return <UserForm id={id} user_name={user_name} phone={phone} isView={isView} setState={setState} />
    case 'match':
      return (
        <MatchForm
          match_id={id}
          home_team_id={home_team_id}
          away_team_id={away_team_id}
          league_id={league_id}
          time_start={time_start}
          stadium={stadium}
          match_status={match_status}
          predicted_result={predicted_result}
          result={result}
          penalty_result={penalty_result}
          isView={isView}
          setState={setState}
        />
      )
  }
}
