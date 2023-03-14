import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreateFootballer, adminEditFootballer } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'
import useUser from '../../../hooks/useUser'
import { SelectClub } from './select'

interface Props {
	id?: number
	full_name?: string | null
	short_name?: string | null
	nationality?: string | null
	place_of_birth?: string | null
	date_of_birth?: string | null
	height?: number | null
	club_id?: number | null
	club_name?: string | null
	clothers_number?: number | null
	market_price?: string | null
	isView?: boolean
	setState: Dispatch<SetStateAction<number>>
}

export default function FootballerForm({
	id,
	height,
	club_id,
	club_name,
	clothers_number,
	market_price,
	full_name,
	short_name,
	nationality,
	place_of_birth,
	date_of_birth,
	isView,
	setState,
}: Props) {
	const [err, setErr] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)
	const { user } = useUser()
	const [club, setClub] = useState<number | null>(null)

	const props = [
		{
			value: full_name,
			name: 'full_name',
			placeholder: 'Tên đầy đủ',
		},
		{
			value: short_name,
			name: 'short_name',
			placeholder: 'Tên viết tắt',
		},
		{
			value: nationality,
			name: 'nationality',
			placeholder: 'Quốc tịch',
		},
		{
			value: place_of_birth,
			name: 'place_of_birth',
			placeholder: 'Nơi sinh',
		},
		{
			value: date_of_birth,
			name: 'date_of_birth',
			placeholder: 'Ngày sinh',
		},
		{
			value: height,
			name: 'height',
			placeholder: 'Chiều cao',
		},
		{
			value: clothers_number,
			name: 'clothers_number',
			placeholder: 'Số áo',
		},
		{
			value: market_price,
			name: 'market_price',
			placeholder: 'Giá trị',
		},
	]

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			if (formData.get('full_name')?.length === 0) {
				setErr(true)
			} else {
				if (isView === undefined) {
					axios
						.post(
							adminCreateFootballer,
							{
								fullName: formData.get('full_name'),
								shortName: formData.get('short_name'),
								nationality: formData.get('nationality'),
								placeOfBirth: formData.get('place_of_birth'),
								dateOfBirth: formData.get('date_of_birth'),
								height: parseInt(formData.get('height')?.toString() ?? ''),
								clubId: club,
								clubName: formData.get('club_name'),
								clothersNumber: parseInt(formData.get('clothers_number')?.toString() ?? '0'),
								market_price: formData.get('market_price'),
							},
							{
								headers: { Authorization: `Bearer ${user?.api_token}` },
							}
						)
						.then(() => {
							setState(1)
						})
						.catch((err) => {
							console.error(err)
							setState(-1)
						})
				} else {
					axios
						.post(
							adminEditFootballer,
							{
								footballerId: id,
								fullName: formData.get('full_name'),
								shortName: formData.get('short_name'),
								nationality: formData.get('nationality'),
								placeOfBirth: formData.get('place_of_birth'),
								dateOfBirth: formData.get('date_of_birth'),
								height: parseInt(formData.get('height')?.toString() ?? ''),
								clubId: club,
								clubName: formData.get('club_name'),
								clothersNumber: parseInt(formData.get('clothers_number')?.toString() ?? '0'),
								market_price: formData.get('market_price'),
							},
							{
								headers: { Authorization: `Bearer ${user?.api_token}` },
							}
						)
						.then(() => {
							setState(1)
						})
						.catch((err) => {
							console.error(err)
							setState(-1)
						})
				}
			}
		}
	}
	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<h1>{isView === undefined ? 'Thêm mới' : isView ? 'Thông tin chi tiết' : 'Chỉnh sửa'}</h1>
			<div className={s.clubDiv}>
				{props.slice(0, 6).map((e) => (
					<div key={e.name}>
						<label>{e.placeholder}</label>
						<input
							type="text"
							name={e.name}
							placeholder={e.placeholder}
							defaultValue={e.value ?? ''}
							readOnly={isView !== undefined && isView}
						/>
					</div>
				))}
				<div>
					<label>CLB</label>
					<SelectClub isView={isView} id={club_id} setSelected={setClub} />
				</div>
				{props.slice(6, 8).map((e) => (
					<div key={e.name}>
						<label>{e.placeholder}</label>
						<input
							type="text"
							name={e.name}
							placeholder={e.placeholder}
							defaultValue={e.value ?? ''}
							readOnly={isView !== undefined && isView}
						/>
					</div>
				))}
			</div>
			{isView === undefined ? (
				<div>
					{err ? <span>Vui lòng nhập đủ thông tin</span> : null}
					<button type="submit">Thêm</button>
				</div>
			) : null}
			{isView === false ? (
				<div>
					{err ? <span>Vui lòng nhập đủ thông tin</span> : null}
					<button type="submit" className={s.greenbtn}>
						Lưu
					</button>
				</div>
			) : null}
		</form>
	)
}
