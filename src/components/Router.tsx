import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from '../App'
const ErrPage = lazy(() => import('../pages/404'))
const AdminClub = lazy(() => import('../pages/admin/admin-club'))
const AdminFootballer = lazy(() => import('../pages/admin/admin-footballer'))
const AdminLeague = lazy(() => import('../pages/admin/admin-league'))
const AdminMatch = lazy(() => import('../pages/admin/admin-match'))
const AdminPost = lazy(() => import('../pages/admin/admin-post'))
const AdminUser = lazy(() => import('../pages/admin/admin-user'))
const Admin = lazy(() => import('../pages/admin/main'))
const ChangePassword = lazy(() => import('../pages/ChangePassword'))
const CLBPage = lazy(() => import('../pages/CLBPage'))
const ForgotPage = lazy(() => import('../pages/forgot-pass'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const NewsPage = lazy(() => import('../pages/NewsPage'))
const PlayerPage = lazy(() => import('../pages/PlayerPage'))
const PostPage = lazy(() => import('../pages/PostPage'))
const PredictPage = lazy(() => import('../pages/PredictPage'))
const ResultPage = lazy(() => import('../pages/ResultPage'))
const SchedulePage = lazy(() => import('../pages/SchedulePage'))
const SearchPage = lazy(() => import('../pages/searchPage'))
const SignupPage = lazy(() => import('../pages/SignupPage'))

export default function Router() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="*" element={<ErrPage />} />
						<Route index element={<NewsPage />} />
						<Route path="lich-thi-dau" element={<SchedulePage />} />
						<Route path="ket-qua" element={<ResultPage />} />
						<Route path="du-doan" element={<PredictPage />} />
						<Route path="cau-lac-bo/:cId" element={<CLBPage />} />
						<Route path="cau-thu/:pId" element={<PlayerPage />} />
						<Route path="bai-viet/:pId" element={<PostPage />} />
						<Route path="doi-mat-khau" element={<ChangePassword />} />
						<Route path="tim-kiem" element={<SearchPage />} />
					</Route>
					<Route path="/admin" element={<Admin />}>
						<Route index element={<AdminPost />} />
						<Route path="clb" element={<AdminClub />} />
						<Route path="cau-thu" element={<AdminFootballer />} />
						<Route path="giai-dau" element={<AdminLeague />} />
						<Route path="tran-dau" element={<AdminMatch />} />
						<Route path="nguoi-dung" element={<AdminUser />} />
					</Route>
					<Route path="/quen-mat-khau" element={<ForgotPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
