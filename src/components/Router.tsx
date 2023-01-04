import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/LoginPage'
import NewsPage from '../pages/NewsPage'
import PredictPage from '../pages/PredictPage'
import ResultPage from '../pages/ResultPage'
import SchedulePage from '../pages/SchedulePage'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<NewsPage />} />
					<Route path="lich-thi-dau" element={<SchedulePage />} />
					<Route path="ket-qua" element={<ResultPage />} />
					<Route path="du-doan" element={<PredictPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/signup"></Route>
			</Routes>
		</BrowserRouter>
	)
}
