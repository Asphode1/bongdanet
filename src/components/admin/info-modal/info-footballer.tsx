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
	footballerId: number
}

interface DataProps {
	id?: number
	full_name?: string | null
	short_name: string | null
	nationality?: string | null
	place_of_birth?: string | null
	date_of_birth?: string | null
	height?: number | null
	club_id: number
	club_name?: string | null
	clothers_number?: number | null
	market_price?: string | null
}

export default function InfoModal({ type, viewtype, view, setView }: Props) {
	const [state, setState] = useState(0)
	const getPost = ({ url, footballerId }: FetchProps) => axios.post(url, { footballerId }).then((res) => res.data.data)

	const { data } = useSWR<DataProps>(
		{ url: 'http://football.local.com:80/api/admin/footballer/detail', footballerId: view },
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
						nationality={data?.nationality}
						place_of_birth={data?.place_of_birth}
						date_of_birth={data?.date_of_birth}
						height={data?.height}
						club_id={data?.club_id}
						club_name={data?.club_name}
						clothers_number={data?.clothers_number}
						market_price={data?.market_price}
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
