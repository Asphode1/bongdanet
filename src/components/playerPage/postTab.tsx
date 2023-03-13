import { TabProps } from '../CLBPage/MainTab'
import axios from 'axios'
import useSWR from 'swr'
import { PostProps } from '../../pages/NewsPage'
import { Link } from 'react-router-dom'
import Post from '../newspage/Post'
import s from '../../styles/player.module.css'

export default function PostTab({ id }: TabProps) {
	const getPostFetcher = (url: string) => axios.get(url).then((res) => res.data.data)
	const { data } = useSWR<PostProps[]>(
		`http://football.local.com:8080/api/post/get_footballer_post/${id}`,
		getPostFetcher
	)
	return (
		<div className={s.postTab}>
			<ul>
				{data?.map((e) => {
					return (
						<li key={e.id}>
							<Link to={`/bai-viet/${e.id}`}>
								<Post item={e} />
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
