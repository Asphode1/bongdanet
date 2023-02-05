import { TabProps } from '../CLBPage/MainTab'
import axios from 'axios'
import useSWR from 'swr'
import { PostProps } from '../../pages/NewsPage'

export default function PostTab({ id }: TabProps) {
	const getPostFetcher = (url: string) => axios.get(url).then((res) => res.data.data)
	const { data } = useSWR<PostProps[]>(
		`http://football.local.com:8080/api/post/get_footballer_post/${id}`,
		getPostFetcher
	)
	return <div></div>
}
