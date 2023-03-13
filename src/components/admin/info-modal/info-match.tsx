import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import s from '../../../styles/admin/modals.module.css'
import { TypeProps } from '../add-new'
import Form from '../forms/forms'
import CloseIcon from '@mui/icons-material/Close'

type ViewType = 'info' | 'edit'

interface Props {
  viewtype: ViewType
  type: TypeProps
  view: number
  setView: Dispatch<SetStateAction<number | null>>
}

interface FetchProps {
  url: string
  matchId: number
}

interface DataProps {
  id: number
  match_id?: number | null
  home_team_id?: number | null
  away_team_id?: number | null
  league_id?: number | null
  time_start?: string | null
  stadium?: string | null
  match_status?: string | null
  predicted_result?: string | null
  result?: string | null
  penalty_result?: string | null
}

export default function InfoModal({ type, viewtype, view, setView }: Props) {
  const [state, setState] = useState(0)
  const getPost = ({ url, matchId }: FetchProps) => axios.post(url, { matchId }).then((res) => res.data.data)

  const { data } = useSWR<DataProps[]>(
    { url: 'http://football.local.com:80/api/admin/match/detail', matchId: view },
    getPost
  )

  if (data)
    return (
      <div className={`mmodal ${s.modal}`}>
        <div className={s.modalBox}>
          <div className={s.form}>
            <Form
              id={view}
              setState={setState}
              home_team_id={data[0]?.home_team_id}
              away_team_id={data[0]?.away_team_id}
              league_id={data[0]?.league_id}
              time_start={data[0]?.time_start}
              stadium={data[0]?.stadium}
              match_status={data[0]?.match_status}
              predicted_result={data[0]?.predicted_result}
              result={data[0]?.result}
              penalty_result={data[0]?.penalty_result}
              type={type}
              isView={viewtype === 'info'}
            />
            {viewtype === 'info' ? (
              <div>
                <button className={s.greenbtn} onClick={() => setView(null)}>
                  Đóng
                </button>
              </div>
            ) : null}
          </div>
          <div className={s.closeBtn} onClick={() => setView(null)}>
            <CloseIcon />
          </div>
          {state !== 0 ? (
            <div className={s.state}>
              <span>{state === 1 ? 'Lưu thành công' : 'Lưu thất bại'}</span>
              <button type="button" onClick={() => setView(null)}>
                Đóng
              </button>
            </div>
          ) : null}
        </div>
      </div>
    )
  return null
}
