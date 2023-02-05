import axios from 'axios'
import useSWR from 'swr'
import { TabProps } from './MainTab'

export interface PlayerProps {
	id?: number
	full_name: string
	nationality: string
	date_of_birth: string
	height: number
	clothers_number: number
	market_price: string
	club_name?: string
}

export default function PlayerTab({ id }: TabProps) {
	const postCLBPlayerFetcher = (url: string) => axios.post(url, { clubId: id }).then((res) => res.data.data)
	const { data } = useSWR<PlayerProps[]>('http://football.local.com:80/api/club/listFootballer', postCLBPlayerFetcher)
	return (
		<div>
			<ul>
				{data?.map((e) => (
					<li key={e.id}>
						<p>{e.full_name}</p>
						<p>{e.nationality}</p>
						<p>{e.date_of_birth}</p>
						<p>{e.height}</p>
						<p>{e.clothers_number}</p>
						<p>{e.market_price}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
