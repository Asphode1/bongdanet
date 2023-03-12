import axios from 'axios'
import { FetcherProps, TabProps } from '../CLBPage/MainTab'
import useSWR from 'swr'
import { PlayerProps } from '../CLBPage/PlayerTab'
import s from '../../styles/player.module.css'

export default function MainTab({ id }: TabProps) {
	const postPlayerFetcher = ({ url, id }: FetcherProps) =>
		axios.post(url, { footballerId: id }).then((res) => res.data.data)

	const { data } = useSWR<PlayerProps>(
		{ url: 'http://football.local.com:80/api/footballer/info', id: id },
		postPlayerFetcher
	)

	return (
		<div className={s.mainTab}>
			<div className={s.mainHead}>
				<img src={data ? `../../../public/img/${(data.id % 10) + 1}.jpg` : ''} alt="logo" />
				<div>
					<h1>{data?.full_name}</h1>
					<button type="button" className={s.followBtn}>
						Theo dõi
					</button>
				</div>
			</div>
			<div>
				<h2>Quê quán</h2>
				<p>{data?.nationality}</p>
			</div>
			<div>
				<h2>Ngày sinh</h2>
				<p>{data?.date_of_birth}</p>
			</div>
			<div>
				<h2>Chiều cao</h2>
				<p>{data?.height} cm</p>
			</div>
			<div>
				<h2>CLB</h2>
				<p>{data?.club_name}</p>
			</div>
			<div>
				<h2>Số áo</h2>
				<p>{data?.clothers_number}</p>
			</div>
			<div>
				<h2>Giá thị trường</h2>
				<p>{data?.market_price}</p>
				<p></p>
			</div>
		</div>
	)
}
