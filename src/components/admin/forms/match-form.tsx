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
			<h1>{isView === undefined ? 'Th??m m???i' : isView ? 'Th??ng tin chi ti???t' : 'Ch???nh s???a'}</h1>
			<div>
				<label>?????i nh??</label>
				<SelectClub isView={isView} id={home_team_id} setSelected={setHClub} />
			</div>
			<div>
				<label>?????i kh??ch</label>
				<SelectClub isView={isView} id={away_team_id} setSelected={setAClub} />
			</div>
			<div>
				<label>Gi???i ?????u</label>
				<SelectLeague id={league_id} isView={isView} setSelected={setLeague} />
			</div>

			<div>
				<label>"Th???i gian"</label>
				<input
					name="timeStart"
					placeholder="Th???i gian b???t ?????u"
					defaultValue={time_start ?? ''}
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			</div>
			<div>
				<label>SV??</label>
				<input
					name="stadium"
					placeholder="SV??"
					defaultValue={stadium ?? ''}
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			</div>
			<div>
				<label>Tr???ng th??i</label>
				<input
					name="status"
					placeholder="Tr???ng th??i"
					defaultValue={match_status ?? ''}
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			</div>
			<div>
				<label>D??? ??o??n</label>
				<input
					name="pres"
					placeholder="D??? ??o??n t??? s???"
					defaultValue={predicted_result ?? ''}
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			</div>
			<div>
				<label>T??? s???</label>
				<input
					name="res"
					placeholder="T??? s???"
					defaultValue={result ?? ''}
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			</div>
			<div>
				<label>Penalty</label>
				<input
					name="peres"
					placeholder="T??? s??? lu??n l??u"
					defaultValue={penalty_result ?? ''}
					readOnly={isView !== undefined && isView}
					onFocus={() => setErr(false)}
				/>
			</div>

			{isView === undefined ? (
				<div>
					{err ? <span>Vui l??ng nh???p ????? th??ng tin</span> : null}
					<button type="submit">Th??m</button>
				</div>
			) : null}
			{isView === false ? (
				<div>
					{err ? <span>Vui l??ng nh???p ????? th??ng tin</span> : null}
					<button type="submit" className={s.greenbtn}>
						L??u
					</button>
				</div>
			) : null}
		</form>
	)
}
