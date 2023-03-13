import axios from 'axios'
import useSWR from 'swr'
import { TabProps } from './MainTab'
import { PostProps } from '../../pages/NewsPage'
import { Link } from 'react-router-dom'
import Post from '../newspage/Post'
import s from '../../styles/club.module.css'

export default function PostsTab({ id }: TabProps) {
	const getCLBPostFetcher = (url: string) => axios.get(url).then((res) => res.data.data)
	const { data } = useSWR<PostProps[]>(`http://football.local.com:80/api/post/get_club_post/${id}`, getCLBPostFetcher)
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
