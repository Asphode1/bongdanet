import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import s from '../../styles/layout.module.css'
import NavBar from './Header/NavBar'
import SearchBar from './Header/SearchBar'

export default function Header() {
	return (
		<>
			<div className={s.leftHeader}>
				<SportsSoccerIcon className={s.spin} />
				<SearchBar />
			</div>
			<div className={s.middleHeader}>
				<NavBar />
				<span className={s.underline}></span>
			</div>
			<div className={s.rightHeader}></div>
		</>
	)
}
