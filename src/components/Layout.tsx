import { Suspense } from 'react'
import { Outlet } from 'react-router'
import s from '../styles/layout.module.css'
import Header from './Layout/Header'
import Sidenav from './Layout/Sidenav'

export default function Layout() {
	return (
		<>
			<header className={s.header}>
				<Header />
			</header>
			<main className={s.container}>
				<section>
					<Sidenav />
				</section>
				<section>
					<Suspense fallback={<div>loading...</div>}>
						<Outlet />
					</Suspense>
				</section>
				<section></section>
			</main>
		</>
	)
}
