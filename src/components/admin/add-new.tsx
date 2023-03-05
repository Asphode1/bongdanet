import { createPortal } from 'react-dom'

export type TypeProps = 'post' | 'club' | 'footballer' | 'league' | 'match'

interface AddNewProps {
	type: TypeProps
}

export default function AddNewModal({ type }: AddNewProps) {
	return createPortal(<div>Modal</div>, document.body)
}
