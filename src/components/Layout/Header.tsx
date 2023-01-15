import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from '../../styles/layout.module.css'
import NavBar from './Header/NavBar'
import SearchBar from './Header/SearchBar'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const index = ['/', '/lich-thi-dau', '/ket-qua', '/du-doan'].findIndex((e) => e === location.pathname)
  return (
    <>
      <div className={s.leftHeader}>
        <SportsSoccerIcon className={s.spin} onClick={() => navigate('/')} />
        <SearchBar />
      </div>
      <div className={s.middleHeader}>
        <NavBar />
        <span className={index >= 0 && index <= 4 ? s.underline : s.hidden} style={{ left: `${index * 25}%` }}></span>
      </div>
      <div className={s.rightHeader}>
        <Link to={'./login'}>
          <span>Đăng nhập</span>
        </Link>
        <span>&nbsp;hoặc&nbsp;</span>
        <Link to={'./signup'}>
          <span>Đăng ký</span>
        </Link>
      </div>
    </>
  )
}
