import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreateClub, adminEditClub } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'
import useUser from '../../../hooks/useUser'

interface Props {
	id?: number
	full_name?: string | null
	short_name?: string | null
	founded_in?: string | null
	owner?: string | null
	website?: string | null
	isView?: boolean
	setState: Dispatch<SetStateAction<number>>
}

export default function ClubForm({ id, full_name, short_name, founded_in, owner, website, isView, setState }: Props) {
	const [err, setErr] = useState(false)
	const { user } = useUser()
	const formRef = useRef<HTMLFormElement>(null)

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
			value: founded_in,
			name: 'founded_in',
			placeholder: 'Nơi thành lập',
		},
		{
			value: owner,
			name: 'owner',
			placeholder: 'Chủ sở hữu',
		},
		{
			value: website,
			name: 'website',
			placeholder: 'Website',
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
							adminCreateClub,
							{
								fullName: formData.get('full_name'),
								shortName: formData.get('short_name'),
								foundedIn: formData.get('founded_in'),
								owner: formData.get('owner'),
								website: formData.get('website'),
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
							adminEditClub,
							{
								clubId: id,
								fullName: formData.get('full_name'),
								shortName: formData.get('short_name'),
								foundedIn: formData.get('founded_in'),
								owner: formData.get('owner'),
								website: formData.get('website'),
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
				{props.map((e) => (
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
