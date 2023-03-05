import useDebounce from '../../hooks/useDebounce'

export type SearchType = 'post' | 'club' | 'footballer' | 'league' | 'match'

interface SearchProps {
  type: SearchType
}

export default function AdminSearch({ type }: SearchProps) {
  const url = `http://football.local.com:80/api/admin/${type}/search`
  const [search, setSearch] = useState<string>('')

  const searchKey = useDebounce(search, 500)
}
