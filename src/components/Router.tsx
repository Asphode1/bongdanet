import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Dashboard from '../pages/admin/dashboard'
import Admin from '../pages/admin/main'
import ChangePassword from '../pages/ChangePassword'
import CLBPage from '../pages/CLBPage'
import LoginPage from '../pages/LoginPage'
import NewsPage from '../pages/NewsPage'
import PlayerPage from '../pages/PlayerPage'
import PostPage from '../pages/PostPage'
import PredictPage from '../pages/PredictPage'
import ResultPage from '../pages/ResultPage'
import SchedulePage from '../pages/SchedulePage'
import SignupPage from '../pages/SignupPage'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<NewsPage />} />
					<Route path="lich-thi-dau" element={<SchedulePage />} />
					<Route path="ket-qua" element={<ResultPage />} />
					<Route path="du-doan" element={<PredictPage />} />
					<Route path="cau-lac-bo/:cId" element={<CLBPage />} />
					<Route path="cau-thu/:pId" element={<PlayerPage />} />
					<Route path="bai-viet/:pId" element={<PostPage />} />
					<Route path="doi-mat-khau" element={<ChangePassword />} />
				</Route>
				<Route path="/admin" element={<Admin />}>
					<Route index element={<Dashboard />}></Route>
				</Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/signup" element={<SignupPage />}></Route>
			</Routes>
		</BrowserRouter>
	)
}
