import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Sidenav from '../../components/admin/sidenav'
import s from '../../styles/admin/main.module.css'

export default function Admin() {
	return (
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
	)
}
