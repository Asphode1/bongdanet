import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import s from '../../../styles/admin/modals.module.css'
import { TypeProps } from '../add-new'
import Form from '../forms/forms'
import CloseIcon from '@mui/icons-material/Close'
import useUser from '../../../hooks/useUser'

type ViewType = 'info' | 'edit'

interface Props {
	viewtype: ViewType
	type: TypeProps
	view: number
	setView: Dispatch<SetStateAction<number | null>>
}

interface FetchProps {
	url: string
	clubId: number
}

interface DataProps {
	id?: number
	full_name?: string | null
	short_name?: string | null
	founded_in?: string | null
	owner?: string | null
	website?: string | null
}

export default function InfoModal({ type, viewtype, view, setView }: Props) {
	const [state, setState] = useState(0)
	const { user } = useUser()
	const getPost = ({ url, clubId }: FetchProps) =>
		axios
			.post(
				url,
				{ clubId },
				{
					headers: { Authorization: `Bearer ${user?.api_token}` },
				}
			)
			.then((res) => res.data.data)

	const { data } = useSWR<DataProps>(
		{ url: 'http://football.local.com:80/api/admin/club/detail', clubId: view },
		getPost
	)

	return (
		<div className={`mmodal ${s.modal}`}>
			<div className={s.modalBox}>
				<div className={s.form}>
					<Form
						id={view}
						setState={setState}
						full_name={data?.full_name}
						short_name={data?.short_name}
						founded_in={data?.founded_in}
						owner={data?.owner}
						website={data?.website}
						type={type}
						isView={viewtype === 'info'}
					/>
					{viewtype === 'info' ? (
						<div>
							<button className={s.greenbtn} onClick={() => setView(null)}>
								Đóng
							</button>
						</div>
					) : null}
				</div>
				<div className={s.closeBtn} onClick={() => setView(null)}>
					<CloseIcon />
				</div>
				{state !== 0 ? (
					<div className={s.state}>
						<span>{state === 1 ? 'Lưu thành công' : 'Lưu thất bại'}</span>
						<button type="button" onClick={() => setView(null)}>
							Đóng
						</button>
					</div>
				) : null}
			</div>
		</div>
	)
}
