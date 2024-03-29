import s from '../../styles/admin/main.module.css'
import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddNewModal from '../../components/admin/add-new'
import AddIcon from '@mui/icons-material/Add'
import DeleteModal from '../../components/admin/del-modal'
import useDebounce from '../../hooks/useDebounce'
import InfoModal from '../../components/admin/info-modal/info-league'
import { adminDelLeague } from '../../utils/Urls'
import useUser from '../../hooks/useUser'

export interface LeagueProps {
	id: number
	name: string
	short_name: string
}

export default function AdminLeague() {
	const [skey, setSkey] = useState('')
	const [data, setData] = useState<LeagueProps[]>([])
	const [add, setAdd] = useState(false)
	const [del, setDel] = useState<number | null>(null)
	const [view, setView] = useState<number | null>(null)
	const [edit, setEdit] = useState<number | null>(null)
	const [page, setPage] = useState(1)
	const [max, setMax] = useState(0)

	const { user } = useUser()

	const leagueFetcher = (url: string) =>
		axios
			.post(
				url,
				{},
				{
					headers: { Authorization: `Bearer ${user?.api_token}` },
				}
			)
			.then((res) => res.data.data)

	const { data: postData, mutate } = useSWR<LeagueProps[]>(
		`http://football.local.com:80/api/admin/league/all?page=${page}`,
		leagueFetcher
	)

	const searchKey = useDebounce(skey, 200)

	useEffect(() => {
		if (postData) setData(postData)
	}, [postData])

	useEffect(() => {
		axios
			.post(
				'http://football.local.com:80/api/admin/league/all?page=1',
				{},
				{
					headers: { Authorization: `Bearer ${user?.api_token}` },
				}
			)
			.then((res) => setMax(res.data.totalPages))
	}, [])

	useEffect(() => {
		if (del === null || add === false || view === null || edit === null) mutate(postData)
	}, [page, add, del, view, edit])

	useEffect(() => {
		if (searchKey) {
			axios
				.post(
					'http://football.local.com:80/api/admin/league/search',
					{ searchKey },
					{
						headers: { Authorization: `Bearer ${user?.api_token}` },
					}
				)
				.then((res) => setData(res.data.data as LeagueProps[]))
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
						{add ? <AddNewModal type="league" setAdd={setAdd} /> : null}
						{del ? <DeleteModal type="league" url={adminDelLeague} del={del} setDel={setDel} /> : null}
						{view ? <InfoModal viewtype="info" type="league" view={view} setView={setView} /> : null}
						{edit ? <InfoModal viewtype="edit" type="league" view={edit} setView={setEdit} /> : null}
					</div>
				</div>
				<div className={s.table}>
					<table>
						<thead className={s.post}>
							<tr>
								<th>Id</th>
								<th>Tên</th>
								<th>Tên viết tắt</th>
								<th>Tuỳ chọn</th>
							</tr>
						</thead>
						<tbody>
							{data.map((e, index) => (
								<tr key={index}>
									<td>{e.id}</td>
									<td>{e.name}</td>
									<td>{e.short_name}</td>
									<td>
										<button type="button" onClick={() => setView(e.id)}>
											Chi tiết
										</button>
										<button type="button" onClick={() => setEdit(e.id)}>
											Chỉnh sửa
										</button>
										<button type="button" onClick={() => setDel(e.id)}>
											Xoá
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{searchKey.length === 0 ? (
					<div className={s.btnDiv}>
						<button type="button" onClick={() => setPage(1)}>
							Đầu
						</button>
						<button
							type="button"
							onClick={() =>
								setPage((page) => {
									if (page > 1) return page - 1
									return page
								})
							}
						>
							Trước
						</button>
						{Array.from({ length: max > 5 ? 5 : max }, (_, i) => {
							if (max <= 5) return i + 1
							if (page > 3 && page < max - 2) return i + page - 2
							if (page >= max - 2) return i + max - 4
							return i + 1
						}).map((e) => (
							<button type="button" className={e === page ? s.focusedBtn : ''} key={e} onClick={() => setPage(e)}>
								{e}
							</button>
						))}
						<button
							type="button"
							onClick={() =>
								setPage((page) => {
									if (page < max) return page + 1
									return page
								})
							}
						>
							Tiếp
						</button>
						<button type="button" onClick={() => setPage(max)}>
							Cuối
						</button>
					</div>
				) : null}
			</div>
		</div>
	)
}
