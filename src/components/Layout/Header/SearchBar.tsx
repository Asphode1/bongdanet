import SearchIcon from '@mui/icons-material/Search'
import s from '../../../styles/layout.module.css'

export default function SearchBar() {
	return (
		<div>
			<form action="">
				<label htmlFor="">
					<input type="text" name="search" />
				</label>
				<button>
					<SearchIcon />
				</button>
			</form>
		</div>
	)
}
