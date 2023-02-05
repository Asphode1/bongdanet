import axios from 'axios'
import { FetcherProps, TabProps } from '../CLBPage/MainTab'
import useSWR from 'swr'
import { PlayerProps } from '../CLBPage/PlayerTab'
export default function MainTab({ id }: TabProps) {
	const postPlayerFetcher = ({ url, id }: FetcherProps) =>
		axios.post(url, { footballerId: id }).then((res) => res.data.data)
	const { data } = useSWR<PlayerProps>(
		{ url: 'http://football.local.com:80/api/footballer/info', id: id },
		postPlayerFetcher
	)
	return (
		<div>
			<p>{data?.full_name}</p>
			<p>{data?.nationality}</p>
			<p>{data?.date_of_birth}</p>
			<p>{data?.height}</p>
			<p>{data?.club_name}</p>
			<p>{data?.clothers_number}</p>
			<p>{data?.market_price}</p>
		</div>
	)
}
