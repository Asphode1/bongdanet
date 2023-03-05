import SearchIcon from '@mui/icons-material/Search'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import s from '../../../styles/layout.module.css'

export default function SearchBar() {
  const [searchVal, setSearchVal] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/tim-kiem?q=${searchVal}`)
  }

  return (
    <div className={s.searchBar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <input
            placeholder="Tìm kiếm tin tức, cầu thủ, CLB..."
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            name="search"
            className={s.searchInput}
          />
        </label>
        <button className={s.searchBtn}>
          <SearchIcon />
        </button>
      </form>
    </div>
  )
}
