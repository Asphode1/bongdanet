import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/newspage/Post'
import s from '../styles/newspage.module.css'
import axios from 'axios'

export interface PostProps {
	id: number
	title: string
	content: string
	created_at?: string
	modified_at?: string
	deleted_at?: string
}

export default function NewsPage() {
	const [loading, setLoading] = useState<boolean>(false)
	const [page, setPage] = useState<number>(1)
	const [posts, setPosts] = useState<PostProps[]>([])
	const [end, setEnd] = useState<boolean>(false)

	const getPostListFetcher = (url: string) => {
		return axios.get(url).then((res) => res.data)
	}

	useEffect(() => {
		getPostListFetcher(`http://football.local.com:80/api/post/get_post_list?page=${page}`).then((data) => {
			setPosts(data.data)
		})
	}, [])

	const listener = () => {
		const ul = document.querySelector('section>div>ul') as HTMLUListElement
		const a = window.innerHeight + window.scrollY - ul.clientHeight - ul.offsetTop
		if (a > -200 && a < -20) {
			setLoading(true)
			setPage((page) => page + 1)
			getPostListFetcher(`http://football.local.com:80/api/post/get_post_list?page=${page + 1}`)
				.then((res) => {
					if (res.data?.length) setPosts((post) => [...post, ...res.data])
					setLoading(false)
				})
				.catch((err) => {
					console.error(err)
					setEnd(true)
					setLoading(false)
				})
		}
	}

	useEffect(() => {
		if (!end && !loading) {
			window.addEventListener('scroll', listener)
		}
		return () => window.removeEventListener('scroll', listener)
	}, [posts, end, loading])

	const isLoadingInitData = false

	return (
		<div className={s.container}>
			{isLoadingInitData ? (
				<div>Loading...</div>
			) : (
				<ul>
					{posts?.map((e) => {
						return (
							<li key={e.id}>
								<Link to={`/bai-viet/${e.id}`}>
									<Post item={e} />
								</Link>
							</li>
						)
					})}
					{loading ? (
						<>
							<li>
								<Post />
							</li>
							<li>
								<Post />
							</li>
						</>
					) : null}
				</ul>
			)}
		</div>
	)
}
