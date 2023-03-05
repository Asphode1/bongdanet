import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import ErrPage from '../pages/404'
import AdminClub from '../pages/admin/admin-club'
import AdminFootballer from '../pages/admin/admin-footballer'
import AdminLeague from '../pages/admin/admin-league'
import AdminMatch from '../pages/admin/admin-match'
import AdminPost from '../pages/admin/admin-post'
import Admin from '../pages/admin/main'
import ChangePassword from '../pages/ChangePassword'
import CLBPage from '../pages/CLBPage'
import ForgotPage from '../pages/forgot-pass'
import LoginPage from '../pages/LoginPage'
import NewsPage from '../pages/NewsPage'
import PlayerPage from '../pages/PlayerPage'
import PostPage from '../pages/PostPage'
import PredictPage from '../pages/PredictPage'
import ResultPage from '../pages/ResultPage'
import SchedulePage from '../pages/SchedulePage'
import SearchPage from '../pages/searchPage'
import SignupPage from '../pages/SignupPage'

export default function Router() {
  return (
    <BrowserRouter>
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
        </Route>
        <Route path="/quen-mat-khau" element={<ForgotPage />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
