import s from '../../styles/admin/main.module.css'
import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddNewModal from '../../components/admin/add-new'
import AddIcon from '@mui/icons-material/Add'
import useDebounce from '../../hooks/useDebounce'

interface PostProps {
	id: number
	title: string
	content: string
}

export default function AdminPost() {
	const [skey, setSkey] = useState('')
	const [data, setData] = useState<PostProps[]>([])
	const [add, setAdd] = useState(false)
	const postFetcher = (url: string) => axios.get(url).then((res) => res.data.data)

	const { data: postData } = useSWR<PostProps[]>('http://football.local.com:80/api/admin/post/all', postFetcher)

	const searchKey = useDebounce(skey, 200)

	useEffect(() => {
		if (postData) setData(postData)
	}, [postData])

	useEffect(() => {
		if (searchKey) {
			axios
				.post('http://football.local.com:80/api/admin/post/search', { searchKey })
				.then((res) => setData(res.data.data as PostProps[]))
		} else setData(postData ?? [])
	}, [searchKey])

	return (
		<div className={s.container}>
			<div>
				<h1>Quản lý Bài viết</h1>
				<div className={s.opts}>
					<div className={s.searchBar}>
						<input type="text" placeholder="Tìm kiếm..." value={skey} onChange={(e) => setSkey(e.target.value)} />
					</div>
					<div className={s.addNew}>
						<button type="button" onClick={() => setAdd(true)}>
							<p>Thêm mới</p>
							<AddIcon />
						</button>
						{add ? <AddNewModal type="post" /> : null}
					</div>
				</div>
				<div className={s.table}>
					<table>
						<thead className={s.post}>
							<tr>
								<th>Id</th>
								<th>Tiêu đề</th>
								<th>Nội dung</th>
								<th>Tuỳ chọn</th>
							</tr>
						</thead>
						<tbody>
							{data.map((e, index) => (
								<tr key={index}>
									<td>{e.id}</td>
									<td>{e.title}</td>
									<td>{e.content}</td>
									<td>
										<button>Chi tiết</button>
										<button>Chỉnh sửa</button>
										<button>Xoá</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
