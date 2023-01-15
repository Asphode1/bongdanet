import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const tabItems = [
	{
		path: '/',
		name: 'Trang chủ',
	},
	{
		path: '/lich-thi-dau',
		name: 'Lịch thi đấu',
	},
	{
		path: '/ket-qua',
		name: 'Kết quả',
	},
	{
		path: '/du-doan',
		name: 'Dự đoán',
	},
]

export default function NavBar() {
	const location = useLocation()
	const getIndex = () => {
		return tabItems.findIndex((e) => {
			if (location.pathname === '/') return 1
			else if (location.pathname.startsWith(e.path) && e.path !== '/') return 1
			return 0
		})
	}
	const [tabIndex, setTabIndex] = useState<number>(getIndex())
	useEffect(() => setTabIndex(getIndex()), [location])

	return (
		<>
			{tabItems.map((e, index) => {
				return (
					<div key={index}>
						<Link to={e.path} data-on={tabIndex === index ? 'true' : 'false'}>
							<span>{e.name}</span>
						</Link>
					</div>
				)
			})}
		</>
	)
}
