import { Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Sidenav from '../../components/admin/sidenav'
import useUser from '../../hooks/useUser'
import s from '../../styles/admin/main.module.css'

export default function Admin() {
	const [load, setLoad] = useState(false)
	const { user } = useUser()

	const navigate = useNavigate()

	useEffect(() => {
		if (user === null) navigate('/login')
		else setLoad(true)
	}, [])

	return load ? (
		<div className={s.main}>
			<div className={s.sidenav}>
				<Sidenav />
			</div>
			<div className={s.outlet}>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	) : null
}
