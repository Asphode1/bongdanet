import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import s from '../../../styles/layout.module.css'

export default function SearchBar() {
	const [searchVal, setSearchVal] = useState<string>('')
	const [result, setResult] = useState<any[]>([])
	const [isSearching, setIsSearching] = useState<boolean>(false)
	const [searchFocus, setSearchFocus] = useState<boolean>(false)
	const debouncedVal = useDebounce(searchVal, 300)

	useEffect(() => {
		if (debouncedVal) {
			setIsSearching(false)
			// fetch data
			setIsSearching(true)
		} else {
			setResult([])
		}
	}, [debouncedVal])

	return (
		<div className={s.searchBar}>
			<form action="">
				<label htmlFor="">
					<input
						placeholder="Tìm kiếm tin tức, cầu thủ, CLB..."
						type="text"
						value={searchVal}
						onChange={(e) => setSearchVal(e.target.value)}
						name="search"
						className={s.searchInput}
						onFocus={() => {
							setSearchFocus(true)
						}}
						onBlur={() => {
							setSearchFocus(false)
						}}
					/>
				</label>
				<button className={s.searchBtn}>
					<SearchIcon />
				</button>
			</form>
		</div>
	)
}
