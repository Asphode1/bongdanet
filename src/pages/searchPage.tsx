import { searchUrl } from '../utils/Urls'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'
import s from '../styles/search.module.css'
import Post from '../components/newspage/Post'

interface SearchProps {
	url: string
	searchKey: string
}

interface ClubProps {
	id: number
	full_name: string
}

interface PlayerProps {
	id: number
	full_name: string
}

interface PostProps {
	id: number
	title: string
	content: string
}

interface SearchResProps {
	club: ClubProps[]
	footballer: PlayerProps[]
	post: PostProps[]
}

export default function SearchPage() {
	const [searchParams] = useSearchParams()
	const searchQuery = searchParams.get('q')
	const searchFetcher = ({ url, searchKey }: SearchProps) => axios.post(url, { searchKey }).then((res) => res.data.data)
	const { data } = useSWR<SearchResProps>({ url: searchUrl, searchKey: searchQuery }, searchFetcher)

	const navigate = useNavigate()

	return (
		<div className={s.search}>
			<h1>Tìm kiếm với từ khoá {searchQuery}</h1>
			{data?.club.length ? (
				<div className={s.searchProp}>
					<h2>Câu lạc bộ</h2>
					<div>
						<ul>
							{data?.club.map((e, index) => (
								<li key={index}>
									<img src={`../../public/img/${(index % 10) + 1}.jpg`} alt="logo" />
									<p>{e.full_name}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : null}
			{data?.footballer.length ? (
				<div className={s.searchProp}>
					<h2>Cầu thủ</h2>
					<div>
						<ul>
							{data?.footballer.map((e, index) => (
								<li className={s.listItem} onClick={() => navigate(`/cau-thu/${e.id}`)} key={index}>
									<img src={`../../public/img/${(index % 10) + 1}.jpg`} alt="logo" />
									<p>{e.full_name}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : null}
			{data?.post.length ? (
				<div className={s.searchProp}>
					<h2>Bài viết</h2>
					<div>
						<ul>
							{data?.post.map((e, index) => (
								<li className={s.listItem} key={index}>
									<Post item={e} />
								</li>
							))}
						</ul>
					</div>
				</div>
			) : null}
		</div>
	)
}
