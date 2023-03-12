import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreateMatch, adminEditMatch } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'

interface Props {
	match_id?: number | null
	home_team_id?: number | null
	home_team_name?: string | null
	away_team_id?: number | null
	away_team_name?: string | null
	league_id?: number | null
	league_name?: string | null
	time_start?: string | null
	stadium?: string | null
	match_status?: string | null
	predicted_result?: string | null
	result?: string | null
	penalty_result?: string | null
	isView?: boolean
	setState: Dispatch<SetStateAction<number>>
}

export default function MatchForm({
	match_id,
	home_team_id,
	home_team_name,
	away_team_id,
	away_team_name,
	league_id,
	league_name,
	time_start,
	stadium,
	match_status,
	predicted_result,
	result,
	penalty_result,
	isView,
	setState,
}: Props) {
	const [err, setErr] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)

	const props = [
		{
			value: match_id,
			name: 'match_id',
			placeholder: 'ID',
		},
		{
			value: home_team_name,
			name: 'home_team_name',
			placeholder: 'Đội nhà',
		},
		{
			value: away_team_name,
			name: 'away_team_name',
			placeholder: 'Đội khách',
		},
		{
			value: league_name,
			name: 'league_name',
			placeholder: 'Giải đấu',
		},
		{
			value: time_start,
			name: 'time_start',
			placeholder: 'Thời gian bắt đầu',
		},
		{
			value: match_status,
			name: 'match_status',
			placeholder: 'Trạng thái',
		},
		{
			value: result,
			name: 'result',
			placeholder: 'Kết quả',
		},
	]

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			if (formData.get('user_name')?.length === 0 || formData.get('phone')?.length === 0) {
				setErr(true)
			} else {
				if (isView === undefined) {
					if (formData.get('pass')?.length === 0) setErr(true)
					else
						axios
							.post(adminCreateMatch, {
								homeTeamId: formData.get('home_team_id'),
								awayTeamId: formData.get('away_team_id'),
								leagueId: formData.get('league_id'),
								timeStart: formData.get('time_start'),
								stadium: formData.get('stadium'),
								statusId: formData.get('match_status'),
								predictedResult: formData.get('predicted_result'),
								result: formData.get('result'),
								penaltyResult: formData.get('penalty_result'),
							})
							.then((res) => {
								console.log(res)
								setState(1)
							})
							.catch((err) => {
								console.error(err)
								setState(-1)
							})
				} else {
					axios
						.post(adminEditMatch, { userId: id, userName: formData.get('user_name'), phone: formData.get('phone') })
						.then((res) => {
							console.log(res)
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
			<input
				type="text"
				name="user_name"
				placeholder="Tên User"
				defaultValue={user_name ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="phone"
				placeholder="SĐT"
				defaultValue={phone ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			{isView === undefined ? (
				<input
					name="pass"
					placeholder="Mật khẩu"
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			) : null}

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
