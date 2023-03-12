import { Dispatch, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'
import s from '../../styles/admin/modals.module.css'
import CloseIcon from '@mui/icons-material/Close'
import Form from './forms/forms'

export type TypeProps = 'post' | 'club' | 'footballer' | 'league' | 'match' | 'user'

interface AddNewProps {
	type: TypeProps
	setAdd: Dispatch<SetStateAction<boolean>>
}

export default function AddNewModal({ type, setAdd }: AddNewProps) {
	const [state, setState] = useState<number>(0)

	return createPortal(
		<div className={`mmodal ${s.modal}`}>
			<div className={s.modalBox}>
				<div className={s.form}>
					<Form type={type} setState={setState} />
				</div>
				<div className={s.closeBtn} onClick={() => setAdd(false)}>
					<CloseIcon />
				</div>
				{state !== 0 ? (
					<div className={s.state}>
						<span>{state === 1 ? 'Thêm thành công' : 'Thêm thất bại'}</span>
						<button type="button" onClick={() => setAdd(false)}>
							Đóng
						</button>
					</div>
				) : null}
			</div>
		</div>,
		document.body
	)
}
