import { useRef, FormEvent, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { adminCreateMatch, adminEditMatch } from '../../../utils/Urls'
import s from '../../../styles/admin/modals.module.css'
import { SelectClub, SelectLeague } from './select'
import useUser from '../../../hooks/useUser'

interface Props {
	match_id?: number | null
	home_team_id?: number | null
	away_team_id?: number | null
	league_id?: number | null
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
	away_team_id,
	league_id,
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
	const [hclub, setHClub] = useState<number | null>(null)
	const [aclub, setAClub] = useState<number | null>(null)
	const [league, setLeague] = useState<number | null>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const { user } = useUser()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formRef.current) {
			const formData = new FormData(formRef.current)
			if (formData.get('status')?.length === 0) {
				setErr(true)
			} else {
				if (isView === undefined) {
					axios
						.post(
							adminCreateMatch,
							{
								homeTeamId: hclub,
								awayTeamId: aclub,
								leagueId: league,
								timeStart: formData.get('timeStart'),
								stadium: formData.get('stadium'),
								statusId: formData.get('status'),
								predictedResult: formData.get('pres'),
								result: formData.get('res'),
								penaltyResult: formData.get('peres'),
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
							adminEditMatch,
							{
								matchId: match_id,
								homeTeamId: hclub,
								awayTeamId: aclub,
								leagueId: league,
								timeStart: formData.get('timeStart'),
								stadium: formData.get('stadium'),
								statusId: formData.get('status'),
								predictedResult: formData.get('pres'),
								result: formData.get('res'),
								penaltyResult: formData.get('peres'),
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
			<label>Đội nhà</label>
			<SelectClub isView={isView} id={home_team_id} setSelected={setHClub} />
			<label>Đội khách</label>
			<SelectClub isView={isView} id={away_team_id} setSelected={setAClub} />
			<label>Giải đấu</label>
			<SelectLeague id={league_id} isView={isView} setSelected={setLeague} />
			<input
				name="timeStart"
				placeholder="Thời gian bắt đầu"
				defaultValue={time_start ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="stadium"
				placeholder="SVĐ"
				defaultValue={stadium ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="status"
				placeholder="Trạng thái"
				defaultValue={match_status ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="pres"
				placeholder="Dự đoán tỉ số"
				defaultValue={predicted_result ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="res"
				placeholder="Tỉ số"
				defaultValue={result ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
			<input
				name="peres"
				placeholder="Tỉ số luân lưu"
				defaultValue={penalty_result ?? ''}
				readOnly={isView !== undefined && isView}
				onFocus={() => setErr(false)}
			/>
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
