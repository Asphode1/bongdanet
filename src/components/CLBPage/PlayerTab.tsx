import axios from 'axios'
import useSWR from 'swr'
import { TabProps } from './MainTab'
import s from '../../styles/club.module.css'
import { useNavigate } from 'react-router'

export interface PlayerProps {
	id: number
	full_name: string
	nationality: string
	date_of_birth: string
	height: number
	clothers_number: number
	market_price: string
	club_name: string
}

export default function PlayerTab({ id }: TabProps) {
	const postCLBPlayerFetcher = (url: string) => axios.post(url, { clubId: id }).then((res) => res.data.data)
	const navigate = useNavigate()
	const { data } = useSWR<PlayerProps[]>('http://football.local.com:80/api/club/listFootballer', postCLBPlayerFetcher)
	return (
		<div className={s.pTab}>
			<ul>
				{data?.map((e) => (
					<li key={e.id} onClick={() => navigate(`/cau-thu/${e.id}/?tab=chung`)}>
						<div>
							<img src={data ? `/img/${(e.id % 10) + 1}.jpg` : ''} alt="" />
						</div>
						<div>
							<h2>{e.full_name}</h2>
							<p>{e.nationality}</p>
						</div>
						<div>
							<p>Số áo</p>
							<h3>{e.clothers_number}</h3>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
