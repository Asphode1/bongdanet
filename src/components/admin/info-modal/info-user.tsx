import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import s from '../../../styles/admin/modals.module.css'
import { TypeProps } from '../add-new'
import Form from '../forms/forms'
import CloseIcon from '@mui/icons-material/Close'

type ViewType = 'info' | 'edit'

interface Props {
	viewtype: ViewType
	type: TypeProps
	view: number
	setView: Dispatch<SetStateAction<number | null>>
}

interface FetchProps {
	url: string
	userId: number
}

interface DataProps {
	id: number
	user_name: string
	phone: string
}

export default function InfoModal({ type, viewtype, view, setView }: Props) {
	const [state, setState] = useState(0)
	const getPost = ({ url, userId }: FetchProps) => axios.post(url, { userId }).then((res) => res.data.data)

	const { data } = useSWR<DataProps>(
		{ url: 'http://football.local.com:80/api/admin/user/detail', userId: view },
		getPost
	)

	return (
		<div className={`mmodal ${s.modal}`}>
			<div className={s.modalBox}>
				<div className={s.form}>
					<Form
						id={view}
						setState={setState}
						type={type}
						isView={viewtype === 'info'}
						user_name={data?.user_name}
						phone={data?.phone}
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
