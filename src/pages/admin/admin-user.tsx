import s from '../../styles/admin/main.module.css'
import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddNewModal from '../../components/admin/add-new'
import AddIcon from '@mui/icons-material/Add'
import DeleteModal from '../../components/admin/del-modal'
import useDebounce from '../../hooks/useDebounce'
import InfoModal from '../../components/admin/info-modal/info-user'
import { adminDelUser } from '../../utils/Urls'

export interface LeagueProps {
  id: number
  user_name: string
  phone: string
}

export default function AdminUser() {
  const [skey, setSkey] = useState('')
  const [data, setData] = useState<LeagueProps[]>([])
  const [add, setAdd] = useState(false)
  const [del, setDel] = useState<number | null>(null)
  const [view, setView] = useState<number | null>(null)
  const [edit, setEdit] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [max, setMax] = useState(0)
  const postFetcher = (url: string) => axios.post(url).then((res) => res.data.data)

  const { data: postData, mutate } = useSWR<LeagueProps[]>(
    `http://football.local.com:80/api/admin/user/all?page=${page}`,
    postFetcher
  )

  const searchKey = useDebounce(skey, 200)

  useEffect(() => {
    if (postData) setData(postData)
  }, [postData])

  useEffect(() => {
    axios.post('http://football.local.com:80/api/admin/user/all?page=1').then((res) => setMax(res.data.totalPages))
  }, [])

  useEffect(() => {
    if (del === null || add === false || view === null || edit === null) mutate(postData)
  }, [page, add, del, view, edit])

  useEffect(() => {
    if (searchKey) {
      axios
        .post('http://football.local.com:80/api/admin/user/search', { searchKey })
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
            {add ? <AddNewModal type="user" setAdd={setAdd} /> : null}
            {del ? <DeleteModal type="user" url={adminDelUser} del={del} setDel={setDel} /> : null}
            {view ? <InfoModal viewtype="info" type="user" view={view} setView={setView} /> : null}
            {edit ? <InfoModal viewtype="edit" type="user" view={edit} setView={setEdit} /> : null}
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
                  <td>{e.user_name}</td>
                  <td>{e.phone}</td>
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
