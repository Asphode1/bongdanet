import axios from 'axios'
import useSWR from 'swr'

export interface TabProps {
	id: number
}

interface CLBProps {
	id: number
	full_name: string
	short_name: string
	founded_in: string
	owner: string
	website: string
}

export interface FetcherProps {
	url: string
	id: number
}

export default function MainTab({ id }: TabProps) {
	const postCLBFetcher = ({ url, id }: FetcherProps) =>
		axios
			.post(url, {
				clubId: id,
			})
			.then((res) => res.data.data)
	const { data } = useSWR<CLBProps>({ url: 'http://football.local.com:80/api/club/info', id: id }, postCLBFetcher)
	return (
		<div>
			<p>{data?.full_name}</p>
			<p>{data?.short_name}</p>
			<p>{data?.founded_in}</p>
			<p>{data?.owner}</p>
			<p>{data?.website}</p>
		</div>
	)
}
